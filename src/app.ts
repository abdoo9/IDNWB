import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Context, webhookCallback } from "https://deno.land/x/grammy@v1.11.2/mod.ts";
import "https://deno.land/std@0.159.0/dotenv/load.ts";
import { composer } from "./plugins/index.ts";
import { getBot } from "./bots.ts";

const app = new Application();

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  });
app.use((ctx, next) => {
    // Create an instance of the `Bot` class and pass your authentication token to it.
    const url = ctx.request.url
    try{
        const tokenRegexp = /\d{5,}:\S{30,}/g;
        const token = tokenRegexp.exec(url)[0]
        const bot = getBot(token);
    
    
        if (bot !== undefined) {
            // You can now register listeners on your bot object `bot`.
            // grammY will call the listeners when users send messages to your bot.
            // Handle the /start command.
            bot.use(composer)
            // finally, register the webhook
            // https://t.me/c/1493653006/49880
            return webhookCallback(bot, "oak")//(req, res);
        }
        res.send("-_-");
    } catch(e) {
        console.error(e)
    }

    next()
});
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    throw err;
  }
});
await app.listen({ port: 3334 });
console.log("app listening on port ");
// if you want to test locally,
// comment above lines,
// and, un-comment below line
// https://t.me/c/1493653006/49922
// bot.start()
