import { BlogPage01 } from "./blog-page-01";
import { BlogPage02 } from "./blog-page-02";
import { BlogPage03 } from "./blog-page-03";
import { BlogPage04 } from "./blog-page-04";
import { BlogPage05 } from "./blog-page-05";
import { BlogPage06 } from "./blog-page-06";
import { BlogPage07 } from "./blog-page-07";
import { BlogPage08 } from "./blog-page-08";
import { BlogPage09 } from "./blog-page-09";
import { BlogPage10 } from "./blog-page-10";

/** Part A of the blog page variants, keyed by their docs route slug. */
export const variantsA = {
    "blog-page-01": BlogPage01,
    "blog-page-04": BlogPage04,
    "blog-page-07": BlogPage07,
    "blog-page-10": BlogPage10,
    "blog-page-02": BlogPage02,
    "blog-page-05": BlogPage05,
    "blog-page-08": BlogPage08,
    "blog-page-03": BlogPage03,
    "blog-page-06": BlogPage06,
    "blog-page-09": BlogPage09,
} as const;
