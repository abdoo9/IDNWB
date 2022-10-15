import { Composer } from "https://deno.land/x/grammy@v1.11.2/mod.ts";

import inline from "./inline.ts";
import start from "./start.ts";
import tgbte from "./tgbte.ts";

export const composer = new Composer();

composer.use(inline);
composer.use(start);
composer.use(tgbte);
