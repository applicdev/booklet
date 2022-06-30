
import { Application } from "https://deno.land/x/oak/mod.ts";
import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts";

const app = new Application();
app.use(staticFiles("./"));

await app.listen();
