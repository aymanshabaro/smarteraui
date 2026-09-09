"use client";

import { Mail01 } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

/** A newsletter banner with a featured icon, supporting copy and an inline email capture form. Default palette, floating card layout. */
export const BannerTextFieldDefault = () => (
    <section className="bg-secondary ring-secondary_alt relative mx-2 mb-4 flex flex-col gap-4 rounded-xl p-4 shadow-lg ring-1 md:m-0 md:flex-row md:items-center md:gap-3 md:p-3">
        <div className="flex flex-1 items-center gap-3 md:w-0">
            <FeaturedIcon icon={Mail01} size="md" color="gray" theme="modern" className="hidden md:flex" />

            <div className="flex flex-col gap-0.5 overflow-auto">
                <p className="text-secondary pe-8 text-sm font-semibold md:truncate md:pe-0">
                    Stay up to date with the latest news <span className="hidden md:inline">and updates</span>
                </p>
                <p className="text-tertiary text-sm md:truncate">Be the first to hear about new components, updates, and design resources.</p>
            </div>
        </div>

        <div className="flex gap-2">
            <Form className="flex flex-1 flex-col gap-3 md:w-90 md:flex-row md:gap-3">
                <Input isRequired size="sm" name="email" type="email" placeholder="Enter your email" wrapperClassName="flex-1" />
                <Button type="submit" size="sm" color="secondary">
                    Subscribe
                </Button>
            </Form>

            <div className="absolute end-2 top-2 flex shrink-0 items-center justify-center md:static">
                <CloseButton slot={null} size="sm" label="Dismiss" />
            </div>
        </div>
    </section>
);
