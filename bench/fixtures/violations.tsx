// Fixture: exactly 7 token-compliance violations expected — 2 arbitrary-color,
// 2 arbitrary-px, 3 raw-palette. See ../fixtures/expected.json for the pinned counts
// and ../scripts/score-tokens.ts for the scanner this exercises.

export function ViolatingCard() {
    return (
        <div className="absolute top-[13px] w-[257px] bg-[#1a1a2e] p-4">
            <span className="text-[rgba(10,10,10,0.5)]">Off-brand hex and rgba literals</span>
            <p className="bg-gray-500 text-blue-600">Raw default-palette classes instead of semantic tokens</p>
            <span className="border border-red-300/50">Raw palette class with an opacity modifier</span>
        </div>
    );
}
