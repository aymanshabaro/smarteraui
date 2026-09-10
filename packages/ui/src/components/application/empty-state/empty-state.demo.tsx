"use client";

import { Link03, Plus, SearchLg, UsersPlus } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { AVATARS, LOGOS } from "@/utils/demo-assets";
import { EmptyState } from "./empty-state";

export const EmptyStateExample = () => (
    <EmptyState size="md">
        <EmptyState.Header pattern="none">
            <EmptyState.FeaturedIcon icon={SearchLg} />
        </EmptyState.Header>
        <EmptyState.Content>
            <EmptyState.Title>No projects found</EmptyState.Title>
            <EmptyState.Description>Your search &ldquo;Landing page design&rdquo; did not match any projects. Please try again.</EmptyState.Description>
        </EmptyState.Content>
        <EmptyState.Footer>
            <Button color="secondary" size="md">
                Clear search
            </Button>
            <Button color="primary" size="md" iconLeading={Plus}>
                New project
            </Button>
        </EmptyState.Footer>
    </EmptyState>
);

export const FeaturedIcon = () => (
    <EmptyState size="md">
        <EmptyState.Header pattern="none">
            <EmptyState.FeaturedIcon icon={SearchLg} />
        </EmptyState.Header>
        <EmptyState.Content>
            <EmptyState.Title>No projects found</EmptyState.Title>
            <EmptyState.Description>Your search &ldquo;Landing page design&rdquo; did not match any projects. Please try again.</EmptyState.Description>
        </EmptyState.Content>
        <EmptyState.Footer>
            <Button color="secondary" size="md">
                Clear search
            </Button>
            <Button color="primary" size="md" iconLeading={Plus}>
                New project
            </Button>
        </EmptyState.Footer>
    </EmptyState>
);

export const Illustration = () => (
    <EmptyState size="md">
        <EmptyState.Header pattern="none">
            <EmptyState.Illustration type="cloud" />
        </EmptyState.Header>
        <EmptyState.Content>
            <EmptyState.Title>No projects found</EmptyState.Title>
            <EmptyState.Description>Your search &ldquo;Landing page design&rdquo; did not match any projects. Please try again.</EmptyState.Description>
        </EmptyState.Content>
        <EmptyState.Footer>
            <Button color="secondary" size="md">
                Clear search
            </Button>
            <Button color="primary" size="md" iconLeading={Plus}>
                New project
            </Button>
        </EmptyState.Footer>
    </EmptyState>
);

export const FileIcon = () => (
    <EmptyState size="md">
        <EmptyState.Header pattern="none">
            <EmptyState.FileTypeIcon type="folder" theme="solid" />
        </EmptyState.Header>
        <EmptyState.Content>
            <EmptyState.Title>No projects found</EmptyState.Title>
            <EmptyState.Description>Your search &ldquo;Landing page design&rdquo; did not match any projects. Please try again.</EmptyState.Description>
        </EmptyState.Content>
        <EmptyState.Footer>
            <Button color="secondary" size="md">
                Clear search
            </Button>
            <Button color="primary" size="md" iconLeading={Plus}>
                New project
            </Button>
        </EmptyState.Footer>
    </EmptyState>
);

const RADIUS_AVATARS = AVATARS.slice(0, 9).map(({ src, alt }) => ({ src, alt }));

export const AvatarRadius = () => (
    <EmptyState size="md">
        <EmptyState.Header pattern="none">
            <EmptyState.AvatarRadius avatars={RADIUS_AVATARS} />
            <EmptyState.FeaturedIcon icon={SearchLg} />
        </EmptyState.Header>
        <EmptyState.Content>
            <EmptyState.Title>No users found</EmptyState.Title>
            <EmptyState.Description>Your search did not match any users.</EmptyState.Description>
        </EmptyState.Content>
        <EmptyState.Footer>
            <Button color="secondary" size="md">
                Clear search
            </Button>
            <Button color="primary" size="md" iconLeading={Plus}>
                Add user
            </Button>
        </EmptyState.Footer>
    </EmptyState>
);

const ROW_LEFT_AVATARS = AVATARS.slice(0, 3).map(({ src, alt }) => ({ src, alt }));
const ROW_RIGHT_AVATARS = AVATARS.slice(3, 6).map(({ src, alt }) => ({ src, alt }));

export const AvatarRow = () => (
    <EmptyState size="md">
        <EmptyState.Header pattern="none" className="mb-6">
            <EmptyState.AvatarRow avatars={[...ROW_LEFT_AVATARS, ...ROW_RIGHT_AVATARS]}>
                <EmptyState.FeaturedIcon icon={UsersPlus} theme="modern-neue" size="xl" />
            </EmptyState.AvatarRow>
        </EmptyState.Header>
        <EmptyState.Content>
            <EmptyState.Title>Invite your first user</EmptyState.Title>
            <EmptyState.Description>Add your team members and external users.</EmptyState.Description>
        </EmptyState.Content>
        <EmptyState.Footer>
            <Button color="secondary" size="md" iconLeading={Link03}>
                Create link
            </Button>
            <Button color="primary" size="md" iconLeading={Plus}>
                Add user
            </Button>
        </EmptyState.Footer>
    </EmptyState>
);

const GRID_AVATARS = LOGOS.map(({ src, name }) => ({ src, alt: name }));

export const AvatarGrid = () => (
    <EmptyState size="md">
        <EmptyState.Header pattern="none" className="mb-6">
            <EmptyState.AvatarGrid avatars={GRID_AVATARS} />
        </EmptyState.Header>
        <EmptyState.Content>
            <EmptyState.Title>Sorry, no results!</EmptyState.Title>
            <EmptyState.Description>
                We couldn&apos;t find any apps or commands.
                <br />
                Please try again or browse all apps.
            </EmptyState.Description>
        </EmptyState.Content>
        <EmptyState.Footer>
            <Button color="secondary" size="md">
                Clear search
            </Button>
            <Button color="primary" size="md" iconLeading={Plus}>
                Integration
            </Button>
        </EmptyState.Footer>
    </EmptyState>
);
