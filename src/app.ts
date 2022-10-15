import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import { webhookCallback } from "https://deno.land/x/grammy@v1.11.2/mod.ts";

import { composer } from "./plugins/index.ts";
import { getBot } from "./bots.ts";

const app = new expressive.App();

app.use(expressive.bodyParser.json());

app.use("/:botToken", (req, res) => {
    // Create an instance of the `Bot` class and pass your authentication token to it.
    const bot = getBot(req.params.botToken);
    if (bot !== undefined) {
        // You can now register listeners on your bot object `bot`.
        // grammY will call the listeners when users send messages to your bot.
        // Handle the /start command.
        bot.use(composer)
        // finally, register the webhook
        // https://t.me/c/1493653006/49880
        return webhookCallback(bot)(req, res);
    }
    res.send("-_-");
});

const server = await app.listen(3000);
console.log("app listening on port " + server.port);
// if you want to test locally,
// comment above lines,
// and, un-comment below line
// https://t.me/c/1493653006/49922
// bot.start()
