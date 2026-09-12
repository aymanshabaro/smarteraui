/**
 * "Without Proper UI" side of the Priority 3 comparison: a genuinely rendered billing page,
 * built the way an unguided agent typically composes one from bare Tailwind utility classes.
 * Real HTML (not a wireframe or skeleton), deliberately inconsistent so the comparison is honest:
 * three different button treatments, arbitrary one-off spacing and colour picks, a focus style
 * missing from one control, an invoices "card" that doesn't match the plan card above it, and no
 * empty or error state for the invoice list. Static — no interactivity is needed to make the point.
 */
export function WithoutProperUiBilling() {
    return (
        <div className="bg-gray-100 p-4 font-sans text-gray-800">
            <div className="mb-1 text-2xl font-bold text-gray-900">Billing</div>
            <p className="mb-6 text-sm text-gray-500">Manage your plan and payment info.</p>

            <div className="mb-5 rounded-lg bg-white p-5 shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-lg font-semibold">Pro plan</div>
                        <p className="text-sm text-gray-400">$29 / month, billed monthly</p>
                    </div>
                    {/* Ad hoc pill button, blue-600 — a colour the rest of the page never reuses. */}
                    <button className="rounded-full bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700">Upgrade</button>
                </div>
                <div className="mt-4 h-2 w-full rounded bg-gray-200">
                    <div className="h-2 w-2/3 rounded bg-indigo-500" />
                </div>
                <p className="mt-1 text-xs text-gray-400">8 of 12 seats used</p>
            </div>

            {/* Second card: different corner radius, border instead of shadow, tighter padding — nothing here matches the card above it. */}
            <div className="mb-5 rounded bg-white p-3">
                <div className="text-md mb-3 font-bold">Payment method</div>
                <div className="flex items-center justify-between border border-gray-300 p-2">
                    <span className="text-sm">Visa ending in 4242</span>
                    {/* Text link styled as a button-ish thing, sky-600 this time. */}
                    <button className="text-sm text-sky-600 underline">Edit</button>
                </div>
                <button className="mt-3 rounded-md border border-gray-400 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Add payment method</button>
            </div>

            <div className="mb-5 rounded-xl border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">Invoices</div>
                    {/* No empty state considered: the table just renders whatever rows happen to exist. */}
                </div>
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-gray-400">
                            <th className="pb-2 font-medium">Date</th>
                            <th className="pb-2 font-medium">Amount</th>
                            <th className="pb-2 font-medium">Status</th>
                            <th className="pb-2" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-100">
                            <td className="py-2">Jun 1, 2026</td>
                            <td className="py-2">$29.00</td>
                            <td className="py-2 text-green-600">Paid</td>
                            {/* outline-none with nothing to replace it: this control disappears on keyboard focus. */}
                            <td className="py-2 text-right">
                                <button type="button" className="text-blue-500 outline-none">
                                    Download
                                </button>
                            </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                            <td className="py-2">May 1, 2026</td>
                            <td className="py-2">$29.00</td>
                            <td className="py-2 text-green-600">Paid</td>
                            <td className="py-2 text-right">
                                <button type="button" className="text-blue-500 outline-none">
                                    Download
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end gap-2">
                {/* Two more button shapes: a square red one and a plain underlined text button — a fourth style on one screen. */}
                <button type="button" className="px-2 py-2 text-sm text-gray-500 underline">
                    Cancel
                </button>
                <button type="button" className="bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
                    Cancel plan
                </button>
            </div>
        </div>
    );
}
