const { Attachment } = require('discord.js');
const Jimp = require('jimp');

module.exports = {
    name: "meme",
    description: "Adds meme text to uploaded image.",
    usage: "meme top text|bottom text",
    category: "fun",
    note: "Exactly one image must be uploaded in same message as command.",
    run: (client, message, args) => {
        if (args.length <= 0) return message.channel.send("Cannot generate image text without text.");

        let text;
        let attachments = message.attachments;
        let imageURL;
        let fontType;

        if (attachments.size === 1) {
            text = args.join(" ").split("|");
            imageURL = attachments.array()[0];
        }
        else {
            return message.channel.send("Please upload one image with command. Please note that linked "
                + "images are not currently supported.");
        }

        Jimp.read(imageURL).then((image) => {
            if (image.bitmap.width <= 64 && image.bitmap.height <= 32) {
                fontType = Jimp.FONT_SANS_8_WHITE;
            } else if (image.bitmap.width <= 128 && image.bitmap.height <= 64) {
                fontType = Jimp.FONT_SANS_16_WHITE;
            } else if (image.bitmap.width <= 256 && image.bitmap.height <= 128) {
                fontType = Jimp.FONT_SANS_32_WHITE;
            } else if (image.bitmap.width <= 512 && image.bitmap.height <= 256) {
                fontType = Jimp.FONT_SANS_32_WHITE;
            } else if (image.bitmap.width <= 1024 && image.bitmap.height <= 512) {
                fontType = Jimp.FONT_SANS_64_WHITE;
            } else fontType = Jimp.FONT_SANS_128_WHITE;

            Jimp.loadFont(fontType).then(font => {
                image.print(font, 10, 10, {
                    text: text[0],
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_TOP
                }, image.bitmap.width-10, image.bitmap.height-10);
                image.print(font, 10, 10, {
                    text: text[1],
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
                }, image.bitmap.width-10, image.bitmap.height-10);
                image.getBufferAsync(Jimp.AUTO).then(buffer => {
                    message.reply("Here's your meme!", new Attachment(buffer));
                });
            });
        }).catch((err) => {
            message.reply("An unknown error occurred. This shouldn't happen.");
            console.log(err);
        });
    }
}