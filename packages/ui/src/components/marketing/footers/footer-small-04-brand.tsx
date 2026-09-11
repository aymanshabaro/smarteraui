import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { ProperLogo } from "../../foundations/logo/proper-logo";

/** Brand-tinted compact footer pairing the logo with a newsletter sign-up. */
export const FooterSmall04Brand = () => (
    <footer className="bg-brand-section py-12">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-start justify-between gap-y-12 md:flex-row">
                <ProperLogo className="dark-mode" />

                <Form className="flex w-full flex-col gap-4 sm:flex-row md:max-w-100">
                    <Input isRequired size="lg" name="email" type="email" placeholder="Enter your email" wrapperClassName="flex-1" />
                    <Button type="submit" size="lg">
                        Subscribe
                    </Button>
                </Form>
            </div>

            <p className="text-quaternary_on-brand mt-8 text-sm md:mt-16 md:text-end">© 2077 Proper UI. All rights reserved.</p>
        </div>
    </footer>
);
