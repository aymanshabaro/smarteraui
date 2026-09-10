"use client";

import { GradientScan, QRCode } from "@/components/shared-assets/qr-code/qr-code";

const QR_VALUE = "https://www.properui.dev";

// Small inline monogram used to demonstrate the `options.image` override — deterministic,
// no external network request (data URI, not an http(s) link).
const LOGO_MARK =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#53389e"/><path d="M10 21V11h5.5a4 4 0 1 1 0 8H13" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>',
    );

export const QRCodeExample = () => {
    return <QRCode value={QR_VALUE} size="lg" />;
};

export const DefaultExample = () => {
    return <QRCode value={QR_VALUE} />;
};

export const LargeExample = () => {
    return <QRCode value={QR_VALUE} size="lg" />;
};

export const WithGradientScanExample = () => {
    return (
        <div className="relative flex aspect-square w-full max-w-60 items-center justify-center">
            <QRCode value={QR_VALUE} />
            <GradientScan />
        </div>
    );
};

export const WithCustomOptionsExample = () => {
    return (
        <QRCode
            value={QR_VALUE}
            size="lg"
            options={{
                dotsOptions: { type: "rounded", color: "#53389e" },
                cornersSquareOptions: { type: "extra-rounded", color: "#53389e" },
                cornersDotOptions: { type: "dot", color: "#53389e" },
                backgroundOptions: { color: "#ffffff" },
                image: LOGO_MARK,
                imageOptions: { imageSize: 0.4, margin: 4, crossOrigin: "anonymous" },
            }}
        />
    );
};
