import { Camera01 } from "@properui/icons";
import { AVATARS, IMAGES } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";

const author = AVATARS[2];

/**
 * Live specimens for `/docs/typography` (the project documentation).
 * One export per example row in the spec — deterministic, self-contained, no props.
 */

export const ArticleExample = () => (
    <div className="prose mx-auto max-w-180">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor
            aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
        </p>
        <hr />
        <h2>Introduction</h2>
        <p>
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit
            sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.
        </p>
        <p>
            Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue
            enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac
            volutpat.
        </p>
        <figure>
            <blockquote>
                <p>
                    In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never
                    attained, living by voices we shall never hear.
                </p>
            </blockquote>
            <figcaption className="not-prose text-md mt-6 flex items-center gap-3">
                <Avatar size="md" src={author.src} alt={author.name} />
                <span>
                    <span className="text-primary block font-semibold">{author.name}</span>
                    <span className="text-tertiary block">Product Designer</span>
                </span>
            </figcaption>
        </figure>
        <p>
            Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi
            bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
        </p>
        <p>
            Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie
            sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.
        </p>
        <h3>Software and tools</h3>
        <p>
            Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue
            enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac
            volutpat.
        </p>
        <h3>Other resources</h3>
        <p>
            Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum lacus
            malesuada massa ornare et. Vulputate consectetur ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim massa erat cursus vulputate
            gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.
        </p>
        <ol>
            <li>Lectus id duis vitae porttitor enim gravida morbi.</li>
            <li>Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.</li>
            <li>Suspendisse maecenas ac donec scelerisque diam sed est duis purus.</li>
        </ol>
        <figure>
            <img src={IMAGES.landscape[3].src} alt="" />
            <figcaption>
                <Camera01 aria-hidden="true" className="text-utility-neutral-400 size-4" />
                <span>Image courtesy of the Proper UI demo library</span>
            </figcaption>
        </figure>
        <p>
            Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium
            ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at.
        </p>
    </div>
);

export const Headings = () => (
    <div className="prose mx-auto max-w-180">
        <h1>Heading level 1</h1>
        <p>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing
            faucibus consequat, urna.
        </p>
        <h2>Heading level 2</h2>
        <p>
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit
            sit. Tellus aliquam enim urna, etiam.
        </p>
        <h3>Heading level 3</h3>
        <p>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing
            faucibus consequat, urna.
        </p>
        <h4>Heading level 4</h4>
        <p>
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit
            sit. Tellus aliquam enim urna, etiam.
        </p>
    </div>
);

export const Images = () => (
    <div className="prose mx-auto max-w-180">
        <p>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing
            faucibus consequat, urna.
        </p>
        <figure>
            <img src={IMAGES.landscape[3].src} alt="" />
            <figcaption>
                <Camera01 aria-hidden="true" className="text-utility-neutral-400 size-4" />
                <span>Image courtesy of the Proper UI demo library</span>
            </figcaption>
        </figure>
        <p>
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit
            sit. Tellus aliquam enim urna, etiam.
        </p>
    </div>
);

const quoteText =
    "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.";

export const QuoteDefault = () => (
    <div className="prose mx-auto max-w-180">
        <p>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing
            faucibus consequat, urna.
        </p>
        <figure>
            <blockquote>
                <p>{quoteText}</p>
            </blockquote>
            <figcaption className="not-prose text-md mt-6">
                {author.name}, <cite className="not-italic">Product Designer</cite>
            </figcaption>
        </figure>
        <p>
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit
            sit. Tellus aliquam enim urna, etiam.
        </p>
    </div>
);

export const QuoteWithAvatar = () => (
    <div className="prose mx-auto max-w-180">
        <p>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing
            faucibus consequat, urna.
        </p>
        <figure>
            <blockquote>
                <p>{quoteText}</p>
            </blockquote>
            <figcaption className="not-prose mt-6 flex items-center gap-3">
                <Avatar size="md" src={author.src} alt={author.name} />
                <span>
                    <span className="text-primary text-md block font-semibold">{author.name}</span>
                    <span className="text-tertiary text-md block">Product Designer</span>
                </span>
            </figcaption>
        </figure>
        <p>
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit
            sit. Tellus aliquam enim urna, etiam.
        </p>
    </div>
);

export const QuoteCentered = () => (
    <div className="prose prose-centered-quote mx-auto max-w-180">
        <p>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing
            faucibus consequat, urna.
        </p>
        <figure className="flex flex-col items-center">
            <blockquote>
                <p>{quoteText}</p>
            </blockquote>
            <figcaption className="not-prose mt-6 flex flex-col items-center gap-3 text-center">
                <Avatar size="md" src={author.src} alt={author.name} />
                <span>
                    <span className="text-primary text-md block font-semibold">{author.name}</span>
                    <span className="text-tertiary text-md block">Product Designer</span>
                </span>
            </figcaption>
        </figure>
        <p>
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit
            sit. Tellus aliquam enim urna, etiam.
        </p>
    </div>
);

export const QuoteMinimal = () => (
    <div className="prose prose-minimal-quote mx-auto max-w-180">
        <p>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing
            faucibus consequat, urna.
        </p>
        <figure>
            <blockquote>
                <p>{quoteText}</p>
            </blockquote>
            <figcaption className="not-prose text-md mt-6">
                {author.name}, <cite className="not-italic">Product Designer</cite>
            </figcaption>
        </figure>
        <p>
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit
            sit. Tellus aliquam enim urna, etiam.
        </p>
    </div>
);

export const InlineCode = () => (
    <div className="prose mx-auto max-w-180">
        <p>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet <code>commodo</code> consectetur convallis <code>risus</code>. Sed condimentum
            enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, <code>volutpat</code> vulputate posuere purus sit
            congue convallis aliquet. Arcu id augue ut feugiat donec <code>porttitor</code> neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem
            id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
        </p>
    </div>
);

export const FeatureText = () => (
    <div className="prose mx-auto max-w-180">
        <p>
            Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus
            lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu
            ultricies sed mauris vestibulum.
        </p>
        <div className="not-prose bg-secondary text-tertiary rounded-2xl p-8">
            <h2 className="text-display-xs text-primary mb-4 font-semibold">Conclusion</h2>
            <p className="text-md [&+p]:mt-4.5">
                Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit
                sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.
            </p>
            <p className="text-md mt-4.5">
                Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus.
                Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.
            </p>
            <p className="text-md mt-4.5">
                Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum.
                Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor.
            </p>
        </div>
    </div>
);
