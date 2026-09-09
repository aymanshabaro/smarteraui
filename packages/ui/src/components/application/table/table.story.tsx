import type { FC } from "react";
import * as Demos from "./table.demo";

export default {
    title: "Application components/Table",
    decorators: [
        (Story: FC) => (
            <div className="bg-secondary flex min-h-screen w-full justify-center p-4 md:p-8">
                <div className="w-full max-w-6xl">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const TableExample = () => <Demos.TableExample />;
TableExample.storyName = "Table example";

export const TableSmallSizeExample = () => <Demos.TableSmallSizeExample />;
TableSmallSizeExample.storyName = "Table small size example";

export const DividerLine01 = () => <Demos.DividerLine01 />;
DividerLine01.storyName = "Divider line 01";

export const AlternatingFills01 = () => <Demos.AlternatingFills01 />;
AlternatingFills01.storyName = "Alternating fills 01";

export const DividerLine02 = () => <Demos.DividerLine02 />;
DividerLine02.storyName = "Divider line 02";

export const AlternatingFills02 = () => <Demos.AlternatingFills02 />;
AlternatingFills02.storyName = "Alternating fills 02";

export const DividerLine03 = () => <Demos.DividerLine03 />;
DividerLine03.storyName = "Divider line 03";

export const AlternatingFills03 = () => <Demos.AlternatingFills03 />;
AlternatingFills03.storyName = "Alternating fills 03";

export const DividerLine04 = () => <Demos.DividerLine04 />;
DividerLine04.storyName = "Divider line 04";

export const AlternatingFills04 = () => <Demos.AlternatingFills04 />;
AlternatingFills04.storyName = "Alternating fills 04";

export const NoVendorsFound = () => <Demos.NoVendorsFound />;
NoVendorsFound.storyName = "No vendors found";

export const SomethingWentWrong = () => <Demos.SomethingWentWrong />;
SomethingWentWrong.storyName = "Something went wrong";

export const NoUsersFound = () => <Demos.NoUsersFound />;
NoUsersFound.storyName = "No users found";

export const AddFirstIntegration = () => <Demos.AddFirstIntegration />;
AddFirstIntegration.storyName = "Add first integration";

export const InviteFirstUser = () => <Demos.InviteFirstUser />;
InviteFirstUser.storyName = "Invite first user";

export const OfflineState = () => <Demos.OfflineState />;
OfflineState.storyName = "Offline state";
