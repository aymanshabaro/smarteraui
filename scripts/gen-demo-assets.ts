import fs from "fs";
import path from "path";

const COLORS = ["#7F56D9", "#0BA5EC", "#F79009", "#17B26A", "#F04438", "#6172F3", "#EE46BC", "#FF692E", "#2E90FA", "#66C61C", "#7A5AF8", "#E31B54"];

const NAMES = [
    { full: "Olivia Rhye", initials: "OR", first: "Olivia" },
    { full: "Phoenix Baker", initials: "PB", first: "Phoenix" },
    { full: "Lana Steiner", initials: "LS", first: "Lana" },
    { full: "Demi Wilkinson", initials: "DW", first: "Demi" },
    { full: "Candice Wu", initials: "CW", first: "Candice" },
    { full: "Natali Craig", initials: "NC", first: "Natali" },
    { full: "Drew Cano", initials: "DC", first: "Drew" },
    { full: "Orlando Diggs", initials: "OD", first: "Orlando" },
    { full: "Andi Lane", initials: "AL", first: "Andi" },
    { full: "Kate Morrison", initials: "KM", first: "Kate" },
    { full: "Koray Okumus", initials: "KO", first: "Koray" },
    { full: "Ava Wright", initials: "AW", first: "Ava" },
];

const LOGOS = ["Layers", "Sisyphus", "Circooles", "Catalog", "Quotient", "Hourglass"];

function ensureDir(dir: string): void {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function getColor(index: number): string {
    return COLORS[index % COLORS.length];
}

function generateAvatar(index: number): string {
    const name = NAMES[index];
    const color = getColor(index);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <style>
      .avatar-bg {
        fill: ${color};
      }
      .avatar-text {
        fill: white;
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 600;
        font-size: 96;
        text-anchor: middle;
        dominant-baseline: central;
      }
    </style>
  </defs>
  <rect class="avatar-bg" width="256" height="256" rx="32" />
  <text class="avatar-text" x="128" y="128">${name.initials}</text>
</svg>`;
}

function generateLandscape(index: number): string {
    const color1 = getColor(index * 2);
    const color2 = getColor(index * 2 + 1);

    const circles = [
        { x: 400, y: 300, r: 200 },
        { x: 1200, y: 450, r: 250 },
        { x: 800, y: 700, r: 180 },
    ];

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <defs>
    <linearGradient id="grad-landscape-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#grad-landscape-${index})" />
  ${circles.map((c) => `<circle cx="${c.x}" cy="${c.y}" r="${c.r}" fill="white" opacity="0.15" />`).join("\n  ")}
</svg>`;
}

function generateSquare(index: number): string {
    const color1 = getColor(index * 2);
    const color2 = getColor(index * 2 + 1);

    const circles = [
        { x: 200, y: 200, r: 150 },
        { x: 600, y: 400, r: 120 },
        { x: 400, y: 700, r: 100 },
    ];

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="grad-square-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#grad-square-${index})" />
  ${circles.map((c) => `<circle cx="${c.x}" cy="${c.y}" r="${c.r}" fill="white" opacity="0.15" />`).join("\n  ")}
</svg>`;
}

function generateLogo(index: number): string {
    const name = LOGOS[index];

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 32" width="120" height="32" fill="currentColor">
  <circle cx="8" cy="16" r="10" fill="currentColor" />
  <text x="26" y="20" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="20" fill="currentColor" text-anchor="start">${name}</text>
</svg>`;
}

function generateVideoPoster(): string {
    const color1 = getColor(0);
    const color2 = getColor(1);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <defs>
    <linearGradient id="grad-video-poster" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#grad-video-poster)" />
  <circle cx="800" cy="450" r="64" fill="white" />
  <polygon points="792,430 792,470 820,450" fill="white" />
</svg>`;
}

function generateAvatarTransparent(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <g />
</svg>`;
}

function main(): void {
    const docsDir = path.join(process.cwd(), "apps/docs/public/demo");

    ensureDir(path.join(docsDir, "avatars"));
    ensureDir(path.join(docsDir, "landscape"));
    ensureDir(path.join(docsDir, "square"));
    ensureDir(path.join(docsDir, "logos"));

    // Generate avatars
    for (let i = 0; i < 12; i++) {
        const svg = generateAvatar(i);
        const filename = path.join(docsDir, "avatars", `avatar-${String(i + 1).padStart(2, "0")}.svg`);
        fs.writeFileSync(filename, svg, "utf-8");
    }

    // Generate landscapes
    for (let i = 0; i < 8; i++) {
        const svg = generateLandscape(i);
        const filename = path.join(docsDir, "landscape", `landscape-${String(i + 1).padStart(2, "0")}.svg`);
        fs.writeFileSync(filename, svg, "utf-8");
    }

    // Generate squares
    for (let i = 0; i < 4; i++) {
        const svg = generateSquare(i);
        const filename = path.join(docsDir, "square", `square-${String(i + 1).padStart(2, "0")}.svg`);
        fs.writeFileSync(filename, svg, "utf-8");
    }

    // Generate logos
    for (let i = 0; i < 6; i++) {
        const svg = generateLogo(i);
        const filename = path.join(docsDir, "logos", `logo-${String(i + 1).padStart(2, "0")}.svg`);
        fs.writeFileSync(filename, svg, "utf-8");
    }

    // Generate video poster
    const posterSvg = generateVideoPoster();
    fs.writeFileSync(path.join(docsDir, "video-poster.svg"), posterSvg, "utf-8");

    // Generate transparent avatar
    const transparentSvg = generateAvatarTransparent();
    fs.writeFileSync(path.join(docsDir, "avatar-transparent.svg"), transparentSvg, "utf-8");

    console.log("Demo assets generated successfully");
}

main();
