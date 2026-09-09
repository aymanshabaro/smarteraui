"use client";

import { User01 } from "@smarteraui/icons";
import { LOGOS, avatar } from "@/utils/demo-assets";
import { Avatar as AvatarComponent } from "./avatar";
import { AvatarLabelGroup } from "./avatar-label-group";
import { AvatarProfilePhoto } from "./avatar-profile-photo";
import { AvatarAddButton, AvatarCompanyIcon } from "./base-components";

const olivia = avatar(0);
const companyLogo = LOGOS[0];
const groupAvatars = [avatar(0), avatar(1), avatar(2), avatar(3), avatar(4), avatar(5)];

export const AvatarExample = () => <AvatarLabelGroup size="md" src={olivia.src} alt={olivia.alt} title={olivia.name} subtitle={olivia.email} />;

export const Avatar = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(6,max-content)]">
        <AvatarComponent size="xs" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent size="sm" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent size="md" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent size="lg" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent size="xl" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent size="2xl" src={olivia.src} alt={olivia.alt} />
    </div>
);

export const BorderExample = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(6,max-content)]">
        <AvatarComponent border size="xs" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent border size="sm" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent border size="md" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent border size="lg" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent border size="xl" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent border size="2xl" src={olivia.src} alt={olivia.alt} />
    </div>
);

export const StatusIndicatorExample = () => (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-[repeat(6,max-content)]">
        <AvatarComponent status="online" size="xs" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent status="online" size="sm" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent status="online" size="md" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent status="online" size="lg" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent status="online" size="xl" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent status="online" size="2xl" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent status="offline" size="xs" src={olivia.src} alt={olivia.alt} className="max-md:col-start-2 max-md:row-start-1" />
        <AvatarComponent status="offline" size="sm" src={olivia.src} alt={olivia.alt} className="max-md:col-start-2 max-md:row-start-2" />
        <AvatarComponent status="offline" size="md" src={olivia.src} alt={olivia.alt} className="max-md:col-start-2 max-md:row-start-3" />
        <AvatarComponent status="offline" size="lg" src={olivia.src} alt={olivia.alt} className="max-md:col-start-2 max-md:row-start-4" />
        <AvatarComponent status="offline" size="xl" src={olivia.src} alt={olivia.alt} className="max-md:col-start-2 max-md:row-start-5" />
        <AvatarComponent status="offline" size="2xl" src={olivia.src} alt={olivia.alt} className="max-md:col-start-2 max-md:row-start-6" />
    </div>
);

export const CompanyLogoExample = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(6,max-content)]">
        <AvatarComponent
            size="xs"
            src={olivia.src}
            alt={olivia.alt}
            badge={<AvatarCompanyIcon src={companyLogo.src} alt={`${companyLogo.name} logo`} size="xs" />}
        />
        <AvatarComponent
            size="sm"
            src={olivia.src}
            alt={olivia.alt}
            badge={<AvatarCompanyIcon src={companyLogo.src} alt={`${companyLogo.name} logo`} size="sm" />}
        />
        <AvatarComponent
            size="md"
            src={olivia.src}
            alt={olivia.alt}
            badge={<AvatarCompanyIcon src={companyLogo.src} alt={`${companyLogo.name} logo`} size="md" />}
        />
        <AvatarComponent
            size="lg"
            src={olivia.src}
            alt={olivia.alt}
            badge={<AvatarCompanyIcon src={companyLogo.src} alt={`${companyLogo.name} logo`} size="lg" />}
        />
        <AvatarComponent
            size="xl"
            src={olivia.src}
            alt={olivia.alt}
            badge={<AvatarCompanyIcon src={companyLogo.src} alt={`${companyLogo.name} logo`} size="xl" />}
        />
        <AvatarComponent
            size="2xl"
            src={olivia.src}
            alt={olivia.alt}
            badge={<AvatarCompanyIcon src={companyLogo.src} alt={`${companyLogo.name} logo`} size="2xl" />}
        />
    </div>
);

export const VerifiedBadgeExample = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(6,max-content)]">
        <AvatarComponent verified size="xs" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent verified size="sm" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent verified size="md" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent verified size="lg" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent verified size="xl" src={olivia.src} alt={olivia.alt} />
        <AvatarComponent verified size="2xl" src={olivia.src} alt={olivia.alt} />
    </div>
);

export const PlaceholderExample = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(6,max-content)]">
        <AvatarComponent size="xs" placeholderIcon={User01} />
        <AvatarComponent size="sm" placeholderIcon={User01} />
        <AvatarComponent size="md" placeholderIcon={User01} />
        <AvatarComponent size="lg" placeholderIcon={User01} />
        <AvatarComponent size="xl" placeholderIcon={User01} />
        <AvatarComponent size="2xl" placeholderIcon={User01} />
    </div>
);

export const InitialsExample = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(6,max-content)]">
        <AvatarComponent size="xs" initials={olivia.initials} />
        <AvatarComponent size="sm" initials={olivia.initials} />
        <AvatarComponent size="md" initials={olivia.initials} />
        <AvatarComponent size="lg" initials={olivia.initials} />
        <AvatarComponent size="xl" initials={olivia.initials} />
        <AvatarComponent size="2xl" initials={olivia.initials} />
    </div>
);

export const LabelGroupExample = () => (
    <div className="grid grid-cols-1 items-center gap-8 2xl:grid-cols-[repeat(4,max-content)]">
        <AvatarLabelGroup size="sm" src={olivia.src} alt={olivia.alt} title={olivia.name} subtitle={olivia.email} />
        <AvatarLabelGroup size="md" src={olivia.src} alt={olivia.alt} title={olivia.name} subtitle={olivia.email} />
        <AvatarLabelGroup size="lg" src={olivia.src} alt={olivia.alt} title={olivia.name} subtitle={olivia.email} />
    </div>
);

export const GroupExample = () => (
    <div className="grid grid-cols-1 gap-8">
        <div className="flex gap-2">
            <div className="flex -space-x-1">
                {groupAvatars.map((person) => (
                    <AvatarComponent key={person.username} className="ring-bg-primary ring-[1.5px]" size="xs" src={person.src} alt={person.alt} />
                ))}
                <AvatarComponent
                    size="xs"
                    className="ring-bg-primary ring-[1.5px]"
                    placeholder={<span className="text-quaternary flex items-center justify-center text-xs font-semibold">+5</span>}
                />
            </div>
            <AvatarAddButton size="xs" />
        </div>
        <div className="flex gap-2">
            <div className="flex -space-x-2">
                {groupAvatars.map((person) => (
                    <AvatarComponent key={person.username} className="ring-bg-primary ring-[1.5px]" size="sm" src={person.src} alt={person.alt} />
                ))}
                <AvatarComponent
                    size="sm"
                    className="ring-bg-primary ring-[1.5px]"
                    placeholder={<span className="text-quaternary flex items-center justify-center text-sm font-semibold">+5</span>}
                />
            </div>
            <AvatarAddButton size="sm" />
        </div>
        <div className="flex gap-2">
            <div className="flex -space-x-3">
                {groupAvatars.map((person) => (
                    <AvatarComponent key={person.username} className="ring-bg-primary ring-[1.5px]" size="md" src={person.src} alt={person.alt} />
                ))}
                <AvatarComponent
                    size="md"
                    className="ring-bg-primary ring-[1.5px]"
                    placeholder={<span className="text-md text-quaternary flex items-center justify-center font-semibold">+5</span>}
                />
            </div>
            <AvatarAddButton size="md" />
        </div>
    </div>
);

export const ProfilePhoto = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(3,max-content)]">
        <AvatarProfilePhoto verified size="sm" src={olivia.src} alt={olivia.alt} />
        <AvatarProfilePhoto verified size="md" src={olivia.src} alt={olivia.alt} />
        <AvatarProfilePhoto verified size="lg" src={olivia.src} alt={olivia.alt} />
    </div>
);

export const ProfilePhotoPlaceholderExample = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(3,max-content)]">
        <AvatarProfilePhoto verified size="sm" placeholderIcon={User01} />
        <AvatarProfilePhoto verified size="md" placeholderIcon={User01} />
        <AvatarProfilePhoto verified size="lg" placeholderIcon={User01} />
    </div>
);

export const ProfilePhotoInitialsExample = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(3,max-content)]">
        <AvatarProfilePhoto verified size="sm" initials={olivia.initials} />
        <AvatarProfilePhoto verified size="md" initials={olivia.initials} />
        <AvatarProfilePhoto verified size="lg" initials={olivia.initials} />
    </div>
);
