import type { FC } from "react";
import * as Demos from "./command-menu.demo";

export default {
    title: "Application components/Command menu",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-start justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const CommandMenuExample = () => <Demos.CommandMenuExample />;
CommandMenuExample.storyName = "Command menu example";

export const Users = () => <Demos.Users />;
Users.storyName = "Users";

export const UsersStacked = () => <Demos.UsersStacked />;
UsersStacked.storyName = "Users stacked";

export const Actions = () => <Demos.Actions />;
Actions.storyName = "Actions";

export const ActionsStacked = () => <Demos.ActionsStacked />;
ActionsStacked.storyName = "Actions stacked";

export const EmptyState = () => <Demos.EmptyState />;
EmptyState.storyName = "Empty state";

export const UsersMenu = () => <Demos.UsersMenu />;
UsersMenu.storyName = "Users menu";

export const UsersMenuStacked = () => <Demos.UsersMenuStacked />;
UsersMenuStacked.storyName = "Users menu stacked";

export const IntegrationsMenu = () => <Demos.IntegrationsMenu />;
IntegrationsMenu.storyName = "Integrations menu";

export const IntegrationsMenuStacked = () => <Demos.IntegrationsMenuStacked />;
IntegrationsMenuStacked.storyName = "Integrations menu stacked";
