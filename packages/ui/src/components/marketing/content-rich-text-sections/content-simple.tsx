"use client";

import { Tabs } from "@/components/application/tabs/tabs";

/** A centered legal header with a plain-language toggle above the policy body. */
export const ContentSimple = () => (
    <Tabs defaultSelectedKey="legal" className="bg-primary">
        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Current as of 20 Jan 2027</span>
                    <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Privacy Policy</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                        Your privacy is important to us at Proper. We respect your privacy regarding any information we may collect from you across our website.
                    </p>

                    <Tabs.List aria-label="Policy version" size="md" type="button-border" className="mt-8 w-full md:mt-12 md:w-auto [&_[role=tab]]:flex-1">
                        <Tabs.Item id="legal" label="Legal version" />
                        <Tabs.Item id="simple" label="Simple version" />
                    </Tabs.List>
                </div>
            </div>
        </section>

        <Tabs.Panel id="legal" className="max-w-container mx-auto px-4 pb-24 md:px-8">
            <div className="prose md:prose-lg mx-auto md:max-w-180">
                <p>
                    This policy explains what Proper collects when you use our website and products, why we collect it, and what you can ask us to do with it.
                    It applies to proper.example and to every product served from it.
                </p>
                <p>
                    If we change how we handle your information we will update this page and say what changed at the top. Continued use of the service after
                    that date constitutes acceptance of the revised policy.
                </p>

                <h2>What information do we collect?</h2>
                <p>
                    We collect the details you provide directly: your name, your work email address, the organisation you belong to, and anything you enter into
                    a form or a support conversation.
                </p>
                <p>
                    We also record limited technical information automatically — the pages you visit, the approximate region you visit them from, and the
                    browser you use. This is what tells us that a feature is broken before anyone has to report it.
                </p>
                <p>We do not purchase personal data from brokers, and we do not enrich your profile from third-party sources.</p>

                <h2>How do we use your information?</h2>
                <p>
                    The first use is operating the service: signing you in, keeping your workspace separate from everyone else&apos;s, and sending the
                    notifications you asked for.
                </p>
                <p>
                    The second is improving it. Aggregated usage data tells us which parts of the product people never reach, which is usually a design problem
                    rather than a demand problem.
                </p>
                <p>
                    The third is billing and the legal obligations that come with it. Invoices, tax records and fraud checks all require us to retain certain
                    details for a defined period.
                </p>

                <h3>Do we use cookies and other tracking technologies?</h3>
                <p>
                    We set the cookies required to keep you signed in, plus a single first-party analytics cookie. We do not run third-party advertising
                    trackers, so there is nothing to opt out of beyond the analytics toggle in your account settings.
                </p>

                <h3>How long do we keep your information?</h3>
                <p>
                    Account data is retained for as long as your workspace is active and for thirty days afterwards. Billing records are retained for seven
                    years because tax law requires it. Everything else is deleted on the same thirty-day schedule.
                </p>

                <h3>How do we keep your information safe?</h3>
                <p>
                    Data is encrypted in transit and at rest, access is limited to the people who need it to do their jobs, and every access is logged. We test
                    our systems independently each year and publish the summary.
                </p>

                <h2>What are your privacy rights?</h2>
                <p>
                    You may request a copy of the information we hold about you, ask us to correct it, or ask us to delete it. We will respond within thirty
                    days and we will not charge you for the request.
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
        </Tabs.Panel>

        <Tabs.Panel id="simple" className="max-w-container mx-auto px-4 pb-24 md:px-8">
            <div className="prose md:prose-lg mx-auto md:max-w-180">
                <p>The short version, in plain language. The legal version says the same things with the words a lawyer would use.</p>

                <h2>What we collect</h2>
                <p>
                    Your name, your work email, your organisation, and whatever you type into our forms. Plus which pages you looked at and from roughly where.
                </p>

                <h2>What we do with it</h2>
                <p>We use it to run your workspace, to work out which parts of the product are confusing, and to send you an invoice.</p>

                <h3>Cookies</h3>
                <p>Only the ones that keep you signed in, and one that counts page views. No advertising trackers.</p>

                <h3>How long we keep it</h3>
                <p>While your workspace is open, plus thirty days. Invoices stay for seven years because we are required to keep them.</p>

                <h2>What you can ask for</h2>
                <p>A copy of your data, a correction, or a deletion. Email privacy@proper.example and we will answer within thirty days.</p>
                <ol>
                    <li>Tell us the email address on the workspace.</li>
                    <li>Say what you want us to do.</li>
                    <li>Help us confirm the account is yours.</li>
                </ol>
            </div>
        </Tabs.Panel>
    </Tabs>
);
