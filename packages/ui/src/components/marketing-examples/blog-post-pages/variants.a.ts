import { BlogPost01 } from "./blog-post-01";
import { BlogPost02 } from "./blog-post-02";
import { BlogPost03 } from "./blog-post-03";
import { BlogPost04 } from "./blog-post-04";
import { BlogPost05 } from "./blog-post-05";
import { BlogPost06 } from "./blog-post-06";
import { BlogPost07 } from "./blog-post-07";
import { BlogPost08 } from "./blog-post-08";
import { BlogPost09 } from "./blog-post-09";
import { BlogPost10 } from "./blog-post-10";

/** Part A of the blog post variants, keyed by their docs route slug. */
export const variantsA = {
    "blog-post-01": BlogPost01,
    "blog-post-04": BlogPost04,
    "blog-post-07": BlogPost07,
    "blog-post-10": BlogPost10,
    "blog-post-02": BlogPost02,
    "blog-post-05": BlogPost05,
    "blog-post-08": BlogPost08,
    "blog-post-03": BlogPost03,
    "blog-post-06": BlogPost06,
    "blog-post-09": BlogPost09,
} as const;
