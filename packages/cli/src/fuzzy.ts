/**
 * Local fuzzy matching shared by `search` (ranking) and `add` (did-you-mean suggestions).
 * No dependency: a subsequence score for ranking, a bounded edit distance for typos.
 */

/** Registry names are kebab-case; a user typing "date picker" should still hit `date-picker`. */
const normalize = (value: string) => value.toLowerCase().replace(/[\s\-_/.]+/g, "");

/**
 * Returns 0 when `query` is not a subsequence of `haystack`, otherwise a score in (0, 1]
 * that rewards contiguous, early and whole-word matches.
 */
export function fuzzyScore(haystack: string, query: string): number {
    const target = normalize(haystack);
    const needle = normalize(query);
    if (needle.length === 0) return 0;
    if (target === needle) return 1;

    const exact = target.indexOf(needle);
    if (exact !== -1) return 0.9 - Math.min(exact, 40) / 200;

    let cursor = 0;
    let matched = 0;
    let streak = 0;
    let bestStreak = 0;
    for (const character of needle) {
        const found = target.indexOf(character, cursor);
        if (found === -1) return 0;
        streak = found === cursor ? streak + 1 : 1;
        bestStreak = Math.max(bestStreak, streak);
        cursor = found + 1;
        matched += 1;
    }
    return 0.3 * (matched / needle.length) + 0.3 * (bestStreak / needle.length);
}

/** Levenshtein distance, two-row variant. Inputs are component names, so no cutoff is needed. */
export function editDistance(a: string, b: string): number {
    const left = normalize(a);
    const right = normalize(b);
    let previous = Array.from({ length: right.length + 1 }, (_, index) => index);

    for (let i = 1; i <= left.length; i += 1) {
        const current = [i];
        for (let j = 1; j <= right.length; j += 1) {
            const substitution = (previous[j - 1] ?? 0) + (left[i - 1] === right[j - 1] ? 0 : 1);
            current[j] = Math.min((current[j - 1] ?? 0) + 1, (previous[j] ?? 0) + 1, substitution);
        }
        previous = current;
    }
    return previous[right.length] ?? Math.max(left.length, right.length);
}

/**
 * Closest registry names to a mistyped one: fuzzy hits first, then anything within a couple
 * of edits (which is what catches a single wrong or missing letter).
 */
export function nearestNames(names: string[], query: string, limit = 5): string[] {
    const tolerance = query.length <= 4 ? 1 : 2;
    return names
        .map((name) => ({ name, score: fuzzyScore(name, query), distance: editDistance(name, query) }))
        .filter((match) => match.score > 0.25 || match.distance <= tolerance)
        .sort((a, b) => b.score - a.score || a.distance - b.distance || a.name.localeCompare(b.name))
        .slice(0, limit)
        .map((match) => match.name);
}
