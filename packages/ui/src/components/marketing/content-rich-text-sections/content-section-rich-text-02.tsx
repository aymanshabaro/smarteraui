/** A centered legal document body — headings, paragraphs and an ordered list, no chrome. */
export const ContentSectionRichText02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="prose md:prose-lg mx-auto md:max-w-180">
                <p>
                    Your privacy matters to us at Proper UI. This policy explains what we collect when you use our website and products, why we collect it, and
                    what you can ask us to do with it.
                </p>
                <p>
                    It applies to proper.example and to every product served from it. If we ever change how we handle your information, we will update this page
                    and say what changed at the top.
                </p>

                <h2>What information do we collect?</h2>
                <p>
                    We collect the details you give us directly: your name, your work email address, the organisation you belong to, and anything you type into
                    a form or a support conversation.
                </p>
                <p>
                    We also record a small amount of technical information automatically — the pages you visit, the approximate region you visit them from, and
                    the browser you use. This is what tells us that a feature is broken before anyone has to report it.
                </p>
                <p>We do not buy personal data from brokers, and we do not enrich your profile from third-party sources. What you tell us is what we have.</p>

                <h2>How do we use your information?</h2>
                <p>
                    The first use is simply running the service: signing you in, keeping your workspace separate from everyone else&apos;s, and sending the
                    notifications you asked for.
                </p>
                <p>
                    The second is improving it. Aggregated usage data tells us which parts of the product people never reach, which is usually a design problem
                    rather than a demand problem.
                </p>
                <p>
                    The third is billing and the legal obligations that come with it. Invoices, tax records and fraud checks all require us to keep certain
                    details for a defined period.
                </p>

                <h3>Do we use cookies and other tracking technologies?</h3>
                <p>
                    We set the cookies required to keep you signed in, plus a single first-party analytics cookie. We do not run third-party advertising
                    trackers on our site, so there is nothing to opt out of beyond the analytics toggle in your account settings.
                </p>

                <h3>How long do we keep your information?</h3>
                <p>
                    Account data is kept for as long as your workspace is active and for thirty days afterwards, so an accidental deletion can be undone.
                    Billing records are kept for seven years because tax law requires it. Everything else is deleted on the same thirty-day schedule.
                </p>

                <h3>How do we keep your information safe?</h3>
                <p>
                    Data is encrypted in transit and at rest, access is limited to the small number of people who need it to do their jobs, and every access is
                    logged. We test our systems independently each year and publish the summary.
                </p>

                <h2>What are your privacy rights?</h2>
                <p>
                    You can ask for a copy of the information we hold about you, ask us to correct it, or ask us to delete it. We will respond within thirty
                    days, and we will not charge you for the request.
                </p>

                <h3>How can you contact us about this policy?</h3>
                <p>
                    Write to privacy@proper.example and a person will read it. If you would rather escalate, you can also contact the data protection authority
                    in your country. Before you do, here is what usually resolves things fastest:
                </p>
                <ol>
                    <li>Tell us the email address associated with your workspace.</li>
                    <li>Say which of the rights above you are exercising.</li>
                    <li>Give us a way to verify that the account is yours.</li>
                </ol>
            </div>
        </div>
    </section>
);
