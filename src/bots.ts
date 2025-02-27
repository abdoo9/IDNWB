import { Bot } from "https://deno.land/x/grammy@v1.11.2/mod.ts";

const bots = new Map<string, Bot>();

export function getBot(token: string) {
    let bot = bots.get(token);
    if (!bot) {
        try {
            bot = new Bot(token, {
                client: {
                    // We accept the drawback of webhook replies for typing status.
                    canUseWebhookReply: (method) => method === "sendChatAction",
                },
            });
            bots.set(token, bot);
        }
        catch (e) {}
    }
    return bot;
}
