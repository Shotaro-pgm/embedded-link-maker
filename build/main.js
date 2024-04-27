"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ]
});
const prefix = '!';
client.once(discord_js_1.Events.ClientReady, c => {
    console.log('ログインしました。');
});
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.content.startsWith(prefix))
        return;
    const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);
    if (command === 'embed') {
        let embText;
        const [text, link, previewFlag] = args.map(str => str);
        if (previewFlag === 't') {
            embText = '[' + text + ']' + '(' + link + ')';
            message.channel.send(embText);
        }
        else {
            embText = '[' + text + ']' + '(<' + link + '>)';
            message.channel.send(embText);
        }
    }
}));
if (!process.env.DISCORD_TOKEN) {
    const { token } = require('./config.json');
    client.login(token);
}
else {
    client.login(process.env.DISCORD_TOKEN);
}
;
