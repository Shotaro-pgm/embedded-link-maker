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

        if (previewFlag === 't'){
            let embText = '[' + text + ']' + '(' + link +')';
            message.channel.send(embText);
        } else {
            let embText = '[' + text + ']' + '(<' + link +'>)';
            message.channel.send(embText);
        }

        // コマンド自動削除の処理ロジック
        // 直近5件のメッセージを取得する
        let searchedText = message.channel.messages.fetch({ before: '1', limit: 1});
        message.channel.send('result : ' + searchedText)
        // !embedから始まるメッセージがあるかを判定する（ループ）
            // !embedから始まるメッセージを配列に格納する
            // 配列に格納したメッセージを削除する（ループ）
        
    }
});

//ログインフローの切り分け
if(!process.env.DISCORD_TOKEN){
    const { token } = require('./config.json');
    client.login(token);
} else {
    client.login(process.env.DISCORD_TOKEN);
};