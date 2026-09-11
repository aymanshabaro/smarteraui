import type { FC } from "react";
import * as QRCodes from "./qr-code.demo";

export default {
    title: "Base components/QR codes",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex items-center justify-center p-16">
                <Story />
            </div>
        ),
    ],
};

export const QRCodeExample = () => <QRCodes.QRCodeExample />;
QRCodeExample.storyName = "QR code example";

export const DefaultExample = () => <QRCodes.DefaultExample />;
DefaultExample.storyName = "Default example";

export const LargeExample = () => <QRCodes.LargeExample />;
LargeExample.storyName = "Large example";

export const WithGradientScanExample = () => <QRCodes.WithGradientScanExample />;
WithGradientScanExample.storyName = "With gradient scan example";

export const WithCustomOptionsExample = () => <QRCodes.WithCustomOptionsExample />;
WithCustomOptionsExample.storyName = "With custom options example";
