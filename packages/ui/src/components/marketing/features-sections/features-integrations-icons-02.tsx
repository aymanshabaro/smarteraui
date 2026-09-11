import { Button } from "../../base/buttons/button";
import {
    BoltIcon,
    ChatGPTIcon,
    ClaudeIcon,
    CursorIcon,
    FigmaIcon,
    GeminiIcon,
    GitHubIcon,
    GrokIcon,
    LovableIcon,
    NextjsIcon,
    PerplexityIcon,
    ReactIcon,
    ReplitIcon,
    TailwindCSSIcon,
    V0Icon,
    ViteIcon,
} from "../../foundations/integration-icons";

const integrations = [
    { name: "Next.js", icon: NextjsIcon },
    { name: "Vite", icon: ViteIcon },
    { name: "React", icon: ReactIcon },
    { name: "Tailwind CSS", icon: TailwindCSSIcon },
    { name: "Figma", icon: FigmaIcon },
    { name: "GitHub", icon: GitHubIcon },
    { name: "Bolt", icon: BoltIcon },
    { name: "v0", icon: V0Icon },
    { name: "Lovable", icon: LovableIcon },
    { name: "Replit", icon: ReplitIcon },
    { name: "Cursor", icon: CursorIcon },
    { name: "Claude", icon: ClaudeIcon },
    { name: "ChatGPT", icon: ChatGPTIcon },
    { name: "Gemini", icon: GeminiIcon },
    { name: "Grok", icon: GrokIcon },
    { name: "Perplexity", icon: PerplexityIcon },
];

export const FeaturesIntegrationsIcons02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="flex flex-col items-center gap-12 md:gap-16">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Integrations</span>
                    <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Get more value from your tools</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                        Connect your tools, connect your teams. With over 200 apps already available in our directory, your team&apos;s favorite tools are just
                        a click away.
                    </p>
                </div>

                <ul className="grid grid-cols-4 gap-4 self-center px-3 lg:grid-cols-8 lg:gap-8 lg:px-14">
                    {integrations.map((integration) => (
                        <li key={integration.name}>
                            <span className="bg-primary ring-secondary flex size-17 shrink-0 items-center justify-center rounded-lg shadow-xs ring-1 ring-inset md:size-22 md:rounded-xl">
                                <integration.icon aria-hidden="true" className="size-10 md:size-12" />
                                <span className="sr-only">{integration.name}</span>
                            </span>
                        </li>
                    ))}
                </ul>

                <Button color="primary" size="xl">
                    All integrations
                </Button>
            </div>
        </div>
    </section>
);
