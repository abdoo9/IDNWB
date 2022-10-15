import { Composer, InlineKeyboard } from "https://deno.land/x/grammy@v1.11.2/mod.ts";

export const composer = new Composer();

export default composer;

composer.command("start", (ctx) => {
    return ctx.replyWithSticker(
        "CAACAgIAAxkBAAEPu1Fie96etjykdLTIzOW3o4MV6JPv6wACpAwAAqoUyEoBbu6msnyOHCQE",
        {
            reply_markup: new InlineKeyboard().switchInlineCurrent(
                "Share",
                "https://t.me/c/1471736013/26632"
            ),
            reply_to_message_id: ctx.message?.message_id,
        }
    );
});
