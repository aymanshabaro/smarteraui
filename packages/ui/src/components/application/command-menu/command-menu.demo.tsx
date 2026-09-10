"use client";

import type { FC, ReactNode } from "react";
import { Bell01, CreditCard01, LogOut01, Plus, SearchLg, Settings01, Share01, Star01, User01, UserPlus01 } from "@properui/icons";
import { CommandMenu } from "@/components/application/command-menu/command-menu";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { CursorIcon, FigmaIcon, GitHubIcon, NextjsIcon, ReactIcon, TailwindCSSIcon, ViteIcon } from "@/components/foundations/integration-icons";
import { AVATARS } from "@/utils/demo-assets";

/** Keyboard hints shown under the list of every full-size example. */
const FooterHints = () => (
    <CommandMenu.Footer>
        <span className="text-tertiary flex items-center gap-1.5 text-xs font-medium">
            <CommandMenu.Shortcut>↑↓</CommandMenu.Shortcut> to navigate
        </span>
        <span className="text-tertiary flex items-center gap-1.5 text-xs font-medium">
            <CommandMenu.Shortcut>↵</CommandMenu.Shortcut> to select
        </span>
        <span className="text-tertiary flex items-center gap-1.5 text-xs font-medium">
            <CommandMenu.Shortcut>esc</CommandMenu.Shortcut> to close
        </span>
    </CommandMenu.Footer>
);

/** Centers a full-size command menu card the way the docs preview shows it. */
const Frame = ({ children }: { children: ReactNode }) => <div className="flex w-full justify-center p-4">{children}</div>;

/** Keeps a popover-style menu's trigger at the top of the preview so the popover has room to open below it. */
const MenuFrame = ({ children }: { children: ReactNode }) => <div className="flex min-h-140 w-full items-start justify-center p-4">{children}</div>;

const actions: Array<{ id: string; label: string; description: string; icon: FC<{ className?: string }>; shortcut?: string }> = [
    { id: "new-project", label: "Create new project", description: "Start from a blank canvas or a template.", icon: Plus, shortcut: "⌘N" },
    { id: "invite", label: "Invite team member", description: "Send an invite by email or share a link.", icon: UserPlus01, shortcut: "⌘I" },
    { id: "share", label: "Share this page", description: "Copy a public link to this page.", icon: Share01, shortcut: "⌘S" },
    { id: "favourite", label: "Add to favorites", description: "Keep this project at the top of your sidebar.", icon: Star01, shortcut: "⌘D" },
];

const settings: Array<{ id: string; label: string; description: string; icon: FC<{ className?: string }> }> = [
    { id: "profile", label: "Profile settings", description: "Update your photo, name and details.", icon: User01 },
    { id: "notifications", label: "Notifications", description: "Choose what you get notified about.", icon: Bell01 },
    { id: "billing", label: "Billing and plans", description: "Manage your plan, seats and invoices.", icon: CreditCard01 },
    { id: "workspace", label: "Workspace settings", description: "Rename the workspace and set defaults.", icon: Settings01 },
    { id: "logout", label: "Log out", description: "End this session on this device.", icon: LogOut01 },
];

const recentUsers = AVATARS.slice(0, 3);
const allUsers = AVATARS.slice(3, 9);

const integrations: Array<{ id: string; name: string; description: string; icon: FC<{ className?: string }>; connected: boolean }> = [
    { id: "figma", name: "Figma", description: "Sync design files and comments.", icon: FigmaIcon, connected: true },
    { id: "github", name: "GitHub", description: "Link pull requests to issues.", icon: GitHubIcon, connected: true },
    { id: "cursor", name: "Cursor", description: "Open any file straight in the editor.", icon: CursorIcon, connected: false },
    { id: "nextjs", name: "Next.js", description: "Deploy previews on every commit.", icon: NextjsIcon, connected: false },
    { id: "react", name: "React", description: "Generate typed component stubs.", icon: ReactIcon, connected: false },
    { id: "tailwind", name: "Tailwind CSS", description: "Keep tokens in sync with the theme.", icon: TailwindCSSIcon, connected: false },
    { id: "vite", name: "Vite", description: "Run the dev server from the command bar.", icon: ViteIcon, connected: false },
];

const ActionsCard = ({ layout }: { layout: "inline" | "stacked" }) => (
    <CommandMenu layout={layout} className="max-w-160">
        <CommandMenu.Search placeholder="Search commands, projects and people" />

        <CommandMenu.List className="max-h-120" renderEmptyState={() => <CommandMenu.Empty description="Try a different command." />}>
            <CommandMenu.Group label="Actions">
                {actions.map((action) => (
                    <CommandMenu.Item
                        key={action.id}
                        id={action.id}
                        label={action.label}
                        description={layout === "stacked" ? action.description : undefined}
                        icon={action.icon}
                        shortcut={action.shortcut}
                    />
                ))}
            </CommandMenu.Group>

            <CommandMenu.Group label="Settings">
                {settings.slice(0, layout === "stacked" ? 2 : 5).map((setting) => (
                    <CommandMenu.Item
                        key={setting.id}
                        id={setting.id}
                        label={setting.label}
                        description={layout === "stacked" ? setting.description : undefined}
                        icon={setting.icon}
                    />
                ))}
            </CommandMenu.Group>
        </CommandMenu.List>

        <FooterHints />
    </CommandMenu>
);

const UsersCard = ({ layout }: { layout: "inline" | "stacked" }) => (
    <CommandMenu layout={layout} className="max-w-160">
        <CommandMenu.Search placeholder="Search team members" />

        <CommandMenu.List
            className={layout === "stacked" ? "max-h-160" : "max-h-120"}
            renderEmptyState={() => <CommandMenu.Empty description="No one on your team matches that name." />}
        >
            <CommandMenu.Group label="Recent">
                {recentUsers.map((user) => (
                    <CommandMenu.Item key={user.username} id={user.username} label={user.name} description={user.email} avatarUrl={user.src} />
                ))}
            </CommandMenu.Group>

            <CommandMenu.Group label="All members">
                {allUsers.map((user) => (
                    <CommandMenu.Item key={user.username} id={user.username} label={user.name} description={user.email} avatarUrl={user.src} />
                ))}
            </CommandMenu.Group>
        </CommandMenu.List>

        <FooterHints />
    </CommandMenu>
);

const UsersMenuCard = ({ layout }: { layout: "inline" | "stacked" }) => (
    <CommandMenu.Trigger defaultOpen>
        <Button color="secondary" size="md" iconLeading={UserPlus01}>
            Assign to
        </Button>

        <CommandMenu.Popover>
            <CommandMenu layout={layout} className="w-90">
                <CommandMenu.Search placeholder="Assign to…" />

                <CommandMenu.List className="max-h-90" renderEmptyState={() => <CommandMenu.Empty description="No one on your team matches that name." />}>
                    {AVATARS.slice(0, 6).map((user) => (
                        <CommandMenu.Item
                            key={user.username}
                            id={user.username}
                            label={user.name}
                            description={layout === "stacked" ? user.email : user.username}
                            avatarUrl={user.src}
                        />
                    ))}
                </CommandMenu.List>
            </CommandMenu>
        </CommandMenu.Popover>
    </CommandMenu.Trigger>
);

const IntegrationsMenuCard = ({ layout }: { layout: "inline" | "stacked" }) => (
    <CommandMenu.Trigger defaultOpen>
        <Button color="secondary" size="md" iconLeading={Plus}>
            Add integration
        </Button>

        <CommandMenu.Popover>
            <CommandMenu layout={layout} className="w-90">
                <CommandMenu.Search placeholder="Search integrations" />

                <CommandMenu.List className="max-h-90" renderEmptyState={() => <CommandMenu.Empty description="We could not find that integration." />}>
                    {integrations.map((integration) => (
                        <CommandMenu.Item
                            key={integration.id}
                            id={integration.id}
                            label={integration.name}
                            description={layout === "stacked" ? integration.description : undefined}
                            icon={integration.icon}
                            addon={
                                integration.connected ? (
                                    <Badge size="sm" type="pill-color" color="success">
                                        Connected
                                    </Badge>
                                ) : undefined
                            }
                        />
                    ))}
                </CommandMenu.List>
            </CommandMenu>
        </CommandMenu.Popover>
    </CommandMenu.Trigger>
);

export const CommandMenuExample = () => (
    <Frame>
        <ActionsCard layout="inline" />
    </Frame>
);

export const Users = () => (
    <Frame>
        <UsersCard layout="inline" />
    </Frame>
);

export const UsersStacked = () => (
    <Frame>
        <UsersCard layout="stacked" />
    </Frame>
);

export const Actions = () => (
    <Frame>
        <ActionsCard layout="inline" />
    </Frame>
);

export const ActionsStacked = () => (
    <Frame>
        <ActionsCard layout="stacked" />
    </Frame>
);

export const EmptyState = () => (
    <Frame>
        <CommandMenu defaultInputValue="Landing page design" className="max-w-160">
            <CommandMenu.Search placeholder="Search commands, projects and people" />

            <CommandMenu.List
                className="max-h-120"
                renderEmptyState={() => (
                    <CommandMenu.Empty
                        icon={SearchLg}
                        title="No results found"
                        description="Your search “Landing page design” did not match any commands. Please try again."
                    >
                        <Button size="sm" color="secondary" iconLeading={Plus}>
                            Create new project
                        </Button>
                    </CommandMenu.Empty>
                )}
            >
                <CommandMenu.Group label="Actions">
                    {actions.map((action) => (
                        <CommandMenu.Item key={action.id} id={action.id} label={action.label} icon={action.icon} shortcut={action.shortcut} />
                    ))}
                </CommandMenu.Group>
            </CommandMenu.List>

            <FooterHints />
        </CommandMenu>
    </Frame>
);

export const UsersMenu = () => (
    <MenuFrame>
        <UsersMenuCard layout="inline" />
    </MenuFrame>
);

export const UsersMenuStacked = () => (
    <MenuFrame>
        <UsersMenuCard layout="stacked" />
    </MenuFrame>
);

export const IntegrationsMenu = () => (
    <MenuFrame>
        <IntegrationsMenuCard layout="inline" />
    </MenuFrame>
);

export const IntegrationsMenuStacked = () => (
    <MenuFrame>
        <IntegrationsMenuCard layout="stacked" />
    </MenuFrame>
);
