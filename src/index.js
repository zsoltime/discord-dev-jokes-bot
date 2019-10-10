const { Client, RichEmbed } = require('discord.js');
const random = require('utils.random');

const jokes = require('./jokes.json');

const { TOKEN } = process.env;
const bot = new Client();

function getEmbedJoke() {
  const avatar = random([
    'https://i.imgur.com/JuzuXKS.png',
    'https://i.imgur.com/QIKp17x.png',
    'https://i.imgur.com/zCesLaS.png',
    'https://i.imgur.com/AzAAr7R.png',
  ]);
  const color = 0x03a3f3;
  const joke = random(jokes);
  const title = 'This one will make you smile 😅';

  return new RichEmbed()
    .setColor(color)
    .setDescription(joke)
    .setThumbnail(avatar)
    .setTitle(title);
}

function handleIncomingMessage(message) {
  const msg = message.content.toLowerCase();

  if (!message.isMentioned(bot.user)) {
    if (msg === '!joke') {
      message.channel.send(getEmbedJoke());
    }
    return;
  }

  if (msg.includes('joke')) {
    message.channel.send(
      `Do you want to hear a joke, ${message.author}?`
    );
    message.channel.send(getEmbedJoke());
    return;
  }

  if (msg.includes('good bot')) {
    message.channel.send(
      `Aww, ${message.author}, I'm blushing... 😊`
    );
    return;
  }

  if (msg.includes('source') || msg.includes('code')) {
    message.channel.send(
      "I'm a really dumb bot, but if you wanted to see my source code, you can visit my master's GitHub repo: https://github.com/zsoltime/discord-dev-jokes-bot 😉"
    );
    return;
  }

  message.channel.send('Did someone mention me?');
  message.channel.send(
    "If you want me to tell a joke, just say so. Don't forget to mention my name though 😉"
  );
}

// eslint-disable-next-line no-console
bot.on('ready', () => console.log('Bot is connected...'));
bot.on('message', handleIncomingMessage);
bot.login(TOKEN);

module.exports = {
  getEmbedJoke,
  handleIncomingMessage,
};
