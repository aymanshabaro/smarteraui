import { ImageResponse } from "next/og";

/**
 * Social card for the landing page.
 *
 * Rendered with `next/og` rather than a checked-in PNG so the wording stays in step with the
 * page. Satori supports a small CSS subset and no external assets, so the brand ramp values
 * are inlined here (they mirror `--color-brand-600` / `--color-brand-300` in theme.css).
 */

export const alt = "Smartera UI — accessible React components, ready on arrival";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND_600 = "rgb(127 86 217)";
const BRAND_300 = "rgb(214 187 251)";
const GRAY_950 = "rgb(12 14 18)";

export default function OpengraphImage() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: GRAY_950,
                padding: "72px 80px",
                fontFamily: "sans-serif",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: 18,
                        background: "white",
                        color: GRAY_950,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 40,
                        fontWeight: 700,
                    }}
                >
                    S
                </div>
                <div style={{ color: "white", fontSize: 36, fontWeight: 600 }}>Smartera UI</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ color: "white", fontSize: 76, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>
                    Accessible React components, ready on arrival
                </div>
                <div style={{ color: BRAND_300, fontSize: 30, lineHeight: 1.4 }}>
                    Open source, built on React Aria Components and Tailwind CSS v4. MIT licensed.
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                    style={{
                        display: "flex",
                        background: BRAND_600,
                        color: "white",
                        borderRadius: 12,
                        padding: "14px 24px",
                        fontSize: 28,
                        fontWeight: 600,
                    }}
                >
                    npm i @smarteraui/ui
                </div>
                <div style={{ color: "rgb(148 155 170)", fontSize: 26 }}>smarteraui.com</div>
            </div>
        </div>,
        size,
    );
}
