/**
 * Minimal line diff (Myers-style LCS over lines) so `diff` needs no extra dependency.
 */
export type DiffOp = "equal" | "add" | "remove";

export interface DiffLine {
    op: DiffOp;
    text: string;
}

/** Longest common subsequence table over lines; inputs here are single files, so O(n·m) is fine. */
export function diffLines(before: string[], after: string[]): DiffLine[] {
    const rows = before.length;
    const columns = after.length;
    const table: number[][] = Array.from({ length: rows + 1 }, () => new Array<number>(columns + 1).fill(0));

    for (let i = rows - 1; i >= 0; i -= 1) {
        for (let j = columns - 1; j >= 0; j -= 1) {
            const current = table[i] ?? [];
            const next = table[i + 1] ?? [];
            current[j] = before[i] === after[j] ? (next[j + 1] ?? 0) + 1 : Math.max(next[j] ?? 0, current[j + 1] ?? 0);
        }
    }

    const result: DiffLine[] = [];
    let i = 0;
    let j = 0;
    while (i < rows && j < columns) {
        if (before[i] === after[j]) {
            result.push({ op: "equal", text: before[i] ?? "" });
            i += 1;
            j += 1;
        } else if ((table[i + 1]?.[j] ?? 0) >= (table[i]?.[j + 1] ?? 0)) {
            result.push({ op: "remove", text: before[i] ?? "" });
            i += 1;
        } else {
            result.push({ op: "add", text: after[j] ?? "" });
            j += 1;
        }
    }
    while (i < rows) {
        result.push({ op: "remove", text: before[i] ?? "" });
        i += 1;
    }
    while (j < columns) {
        result.push({ op: "add", text: after[j] ?? "" });
        j += 1;
    }
    return result;
}

/** Collapses a diff to changed hunks with `context` unchanged lines around each. */
export function hunks(lines: DiffLine[], context = 3): DiffLine[][] {
    const changed = lines.map((line) => line.op !== "equal");
    const keep = lines.map((_, index) => changed.slice(Math.max(0, index - context), index + context + 1).some(Boolean));

    const groups: DiffLine[][] = [];
    let current: DiffLine[] = [];
    keep.forEach((wanted, index) => {
        const line = lines[index];
        if (wanted && line) {
            current.push(line);
        } else if (current.length > 0) {
            groups.push(current);
            current = [];
        }
    });
    if (current.length > 0) groups.push(current);
    return groups;
}
