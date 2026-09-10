// Fixture: no token-compliance violations expected.
// Uses only semantic tokens, spacing/layout utilities, and Smart Era UI's sanctioned
// `utility-*` color family (see rubric.md, metric 3, for why that family is excluded
// from the raw-palette rule).

export function CleanCard() {
    return (
        <div className="border-primary bg-primary flex flex-col gap-4 rounded-lg border p-6 shadow-md">
            <span className="bg-utility-blue-50 text-utility-blue-700 ring-utility-blue-200 rounded-full px-2 py-0.5 text-sm ring-1">New</span>
            <h2 className="text-primary text-lg font-semibold">Account settings</h2>
            <p className="text-secondary text-sm">Manage your profile, notifications, and billing from one place.</p>
            <button type="button" className="bg-brand-solid text-primary_on-brand hover:bg-brand-solid_hover rounded-md px-4 py-2 text-sm font-medium">
                Save changes
            </button>
        </div>
    );
}
