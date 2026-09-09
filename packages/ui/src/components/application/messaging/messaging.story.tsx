import type { FC } from "react";
import * as Messaging from "@/components/application/messaging/messaging.demo";

export default {
    title: "Application components/Messaging",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const MessagingExample = () => <Messaging.MessagingExample />;
MessagingExample.storyName = "Messaging example";

export const MessageStatus = () => <Messaging.MessageStatus />;
MessageStatus.storyName = "Message status";

export const MessageActionMinimal = () => <Messaging.MessageActionMinimal />;
MessageActionMinimal.storyName = "Message action minimal";

export const MessageActionTextarea = () => <Messaging.MessageActionTextarea />;
MessageActionTextarea.storyName = "Message action textarea";

export const MessageActionAdvanced = () => <Messaging.MessageActionAdvanced />;
MessageActionAdvanced.storyName = "Message action advanced";

export const MessageSimple = () => <Messaging.MessageSimple />;
MessageSimple.storyName = "Message simple";

export const MessageReactions = () => <Messaging.MessageReactions />;
MessageReactions.storyName = "Message reactions";

export const MessageReply = () => <Messaging.MessageReply />;
MessageReply.storyName = "Message reply";

export const MessageAttachment = () => <Messaging.MessageAttachment />;
MessageAttachment.storyName = "Message attachment";

export const MessageAudio = () => <Messaging.MessageAudio />;
MessageAudio.storyName = "Message audio";

export const MessageImage = () => <Messaging.MessageImage />;
MessageImage.storyName = "Message image";

export const MessageLinkPreview = () => <Messaging.MessageLinkPreview />;
MessageLinkPreview.storyName = "Message link preview";

export const MessageLinkMinimal = () => <Messaging.MessageLinkMinimal />;
MessageLinkMinimal.storyName = "Message link minimal";

export const MessageWriting = () => <Messaging.MessageWriting />;
MessageWriting.storyName = "Message writing";
