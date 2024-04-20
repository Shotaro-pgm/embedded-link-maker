const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const prefix = '!';

client.once(Events.ClientReady, c => {
    console.log('ログインしました。');
});

client.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix)) return;

    const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);
    if(command === 'embed'){
        // ここにマークダウン[]()にする処理を書く
        const [text, link, previewFlag] = args.map(str => str);
        console.log(text);
        console.log(link);

        if (previewFlag === 't'){
            let embText = '[' + text + ']' + '(' + link +')';
            message.channel.send(embText);
        } else {
            let embText = '[' + text + ']' + '(<' + link +'>)';
            message.channel.send(embText);
        }
        
    }
});

//ログインフローの切り分け
if(!process.env.DISCORD_TOKEN){
    const { token } = require('./config.json');
    client.login(token);
} else {
    client.login(process.env.DISCORD_TOKEN);
};