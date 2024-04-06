const { Client, Events, GatewayIntentBits } = require('discord.js');
// 開発用の仮置きのトークン（デプロイ時にHeroku環境変数を読むように書き換えること
const { token } = require('./config.json');
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
        const [text, link] = args.map(str => str);
        console.log(text);
        console.log(link);
        let embText = '[' + text + ']' + '(' + link +')';
        message.channel.send(embText);
    }
});


client.login(token);