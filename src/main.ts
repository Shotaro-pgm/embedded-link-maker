import { Client, Events, GatewayIntentBits } from "discord.js";
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const prefix = '!';

client.once(Events.ClientReady, c => {
    console.log('ログインしました。');
})

client.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix)) return;

    const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);
    if(command === 'embed'){
        let embText: string
        const [text, link, previewFlag] = args.map(str => str);

        if(previewFlag === 't'){
            embText = '[' + text + ']' + '(' + link +')';
            message.channel.send(embText);
        } else {
            embText = '[' + text + ']' + '(<' + link +'>)';
            message.channel.send(embText);
        }
    }
});

if(!process.env.DISCORD_TOKEN){
    const { token } = require('./config.json');
    client.login(token);
} else {
    client.login(process.env.DISCORD_TOKEN);
};