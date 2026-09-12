/**
 * Local HTML templates rendered to file:// pages and driven/recorded by Playwright in
 * scripts/record-demos.ts. Kept separate from that file because they're markup, not pipeline
 * logic — the terminal chrome (dark macOS window, Inter/SF Mono) is shared across the two
 * terminal-style clips (the typed intro and the transcript replay) so it only lives in one place.
 */

export const OUT_SIZE = { width: 1280, height: 800 };
export const RECORD_SIZE = { width: 1440, height: 900 };

const FONT_STACK = 'Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif';
const MONO_STACK = '"SF Mono","SFMono-Regular",Consolas,"Liberation Mono",monospace';

export const escapeHtml = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The dark macOS-style terminal chrome shared by the intro and replay clips: three window dots,
 *  no other fake app chrome, per the storyboard brief. `bodyHtml` is trusted (already escaped by
 *  the caller where it contains dynamic text) and `extraCss`/`extraScript` let each clip add its
 *  own typing/replay behavior without duplicating the card markup. */
function terminalCardHtml(bodyHtml: string, extraCss: string, extraScript: string): string {
    return `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  html,body{margin:0;width:${RECORD_SIZE.width}px;height:${RECORD_SIZE.height}px;background:#05060a;display:flex;align-items:center;justify-content:center;font-family:${FONT_STACK};}
  .card{width:1080px;border-radius:16px;overflow:hidden;background:#0c0e12;box-shadow:0 30px 70px -20px rgba(0,0,0,.6);}
  .bar{display:flex;align-items:center;gap:8px;padding:14px 18px;background:rgba(255,255,255,.04);}
  .dot{width:11px;height:11px;border-radius:50%;}
  .term{padding:24px 26px 30px;font:14px/1.65 ${MONO_STACK};color:#e7e7ea;min-height:480px;max-height:480px;overflow:hidden;}
  ${extraCss}
</style></head>
<body>
  <div class="card">
    <div class="bar"><span class="dot" style="background:#ff5f57"></span><span class="dot" style="background:#febc2e"></span><span class="dot" style="background:#28c840"></span></div>
    <div class="term" id="term">${bodyHtml}</div>
  </div>
  <script>${extraScript}</script>
</body></html>`;
}

/**
 * Clip 2: `$ cd <dir>`, `$ claude`, then the Claude Code `>` prompt with the owner's real prompt
 * typed at `charDelayMs` per character. `window.playIntro()` resolves once all three lines have
 * finished typing, so the caller knows exactly when to stop recording.
 */
export function terminalIntroHtml(cdCommand: string, promptText: string, charDelayMs: number): string {
    const body = `
    <div class="line"><span class="prompt">$ </span><span id="l1" class="typed"></span></div>
    <div class="line"><span class="prompt">$ </span><span id="l2" class="typed"></span></div>
    <div class="line prompt-line"><span class="chevron">&gt; </span><span id="l3" class="typed"></span><span class="caret">&#9615;</span></div>`;
    const css = `
  .line{display:none;margin-top:14px;}
  .line.show{display:block;}
  .prompt{color:#8fd0ff;}
  .prompt-line{color:#fff;}
  .chevron{color:#7f56d9;font-weight:700;}
  .typed{white-space:pre-wrap;word-break:break-word;}
  .caret{color:#7f56d9;}
  `;
    const script = `
    const CD = ${JSON.stringify(cdCommand)};
    const PROMPT = ${JSON.stringify(promptText)};
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    async function typeInto(id, text, delayMs) {
      const el = document.getElementById(id);
      el.parentElement.classList.add("show");
      for (const ch of text) {
        el.textContent += ch;
        await wait(delayMs);
      }
    }
    window.playIntro = async (delayMs) => {
      await wait(200);
      await typeInto("l1", CD, delayMs);
      await wait(350);
      await typeInto("l2", "claude", delayMs);
      await wait(500);
      await typeInto("l3", PROMPT, delayMs);
      await wait(500);
    };`;
    return terminalCardHtml(body, css, script);
}

/**
 * Clip 3: replays `lines` (already formatted plain/tool/result strings, see scripts/demo/
 * transcript.ts) one at a time, each visible for its own `ms`, auto-scrolling so the newest line
 * stays on screen — the "terminal tailing a running session" look. `window.playReplay()` resolves
 * once every line has appeared and its hold time has elapsed.
 */
export function replayHtml(lines: { text: string; dim: boolean; ms: number }[]): string {
    const css = `
  #term{overflow-y:hidden;}
  #out div{margin-top:7px;white-space:pre-wrap;word-break:break-word;}
  #out div.dim{color:#8b8d98;}
  `;
    const script = `
    const LINES = ${JSON.stringify(lines)};
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    window.playReplay = async () => {
      const out = document.getElementById("out");
      const term = document.getElementById("term");
      for (const line of LINES) {
        const el = document.createElement("div");
        if (line.dim) el.className = "dim";
        el.textContent = line.text;
        out.appendChild(el);
        term.scrollTop = term.scrollHeight;
        await wait(line.ms);
      }
      await wait(300);
    };`;
    return terminalCardHtml('<div id="out"></div>', css, script);
}

/** A single centered line of text on a plain white card — used for the two title cards and the
 *  fixture-mode placeholder. Rendered at OUT_SIZE (the final output resolution), not RECORD_SIZE,
 *  since title cards are captured as a still screenshot rather than a Playwright video. */
export function titleCardHtml(text: string): string {
    return `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  html,body{margin:0;width:${OUT_SIZE.width}px;height:${OUT_SIZE.height}px;background:#ffffff;display:flex;align-items:center;justify-content:center;}
  .t{font:600 40px/1.3 ${FONT_STACK};color:#181d27;letter-spacing:-0.01em;text-align:center;padding:0 100px;}
</style></head>
<body><div class="t">${escapeHtml(text)}</div></body></html>`;
}

/** The end card: "properui.dev" plus a smaller subtitle line. Kept distinct from titleCardHtml
 *  since it needs two text sizes rather than one. */
export function endCardHtml(title: string, subtitle: string): string {
    return `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  html,body{margin:0;width:${OUT_SIZE.width}px;height:${OUT_SIZE.height}px;background:#ffffff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;}
  .title{font:650 44px/1.2 ${FONT_STACK};color:#181d27;letter-spacing:-0.01em;}
  .subtitle{font:400 18px/1.5 ${FONT_STACK};color:#535862;text-align:center;padding:0 120px;}
</style></head>
<body><div class="title">${escapeHtml(title)}</div><div class="subtitle">${escapeHtml(subtitle)}</div></body></html>`;
}
