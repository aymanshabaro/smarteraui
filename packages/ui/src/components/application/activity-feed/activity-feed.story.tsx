import type { FC } from "react";
import * as ActivityFeeds from "@/components/application/activity-feed/activity-feed.demo";

export default {
    title: "Application components/Activity feeds",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary relative h-[600px] w-full">
                <Story />
            </div>
        ),
    ],
};

export const ActivityFeedExample = () => <ActivityFeeds.ActivityFeedExample />;
ActivityFeedExample.storyName = "Activity feed example";

export const ActivityFeedDivided = () => <ActivityFeeds.ActivityFeedDivided />;
ActivityFeedDivided.storyName = "Activity feed divided";

export const ActivityFeedConnected = () => <ActivityFeeds.ActivityFeedConnected />;
ActivityFeedConnected.storyName = "Activity feed connected";

export const ActivityFeedSpaced = () => <ActivityFeeds.ActivityFeedSpaced />;
ActivityFeedSpaced.storyName = "Activity feed spaced";

export const MessagesDivided = () => <ActivityFeeds.MessagesDivided />;
MessagesDivided.storyName = "Messages divided";

export const MessagesConnected = () => <ActivityFeeds.MessagesConnected />;
MessagesConnected.storyName = "Messages connected";

export const MessagesSpaced = () => <ActivityFeeds.MessagesSpaced />;
MessagesSpaced.storyName = "Messages spaced";
