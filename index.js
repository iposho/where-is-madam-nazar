const express = require('express');

const app = express();

// Telegraf's imports
const { Telegraf } = require('telegraf');

// Tools
const logger = require('./config/logger');
const strings = require('./config/strings');
const api = require('./config/requests');

const { name, version } = require('./package.json');

require('dotenv').config();

// Init app
app.set('port', (process.env.PORT || 5000));

// Init bot
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const firstName = ctx.update.message.from.first_name;

  const message = `Hi, ${firstName}!\n\nIf you want to see Madam Nazar current location, send /location command`;

  logger.addEntryToUserLog(ctx.update);

  return ctx.replyWithHTML(message);
});

bot.command('location', (ctx) => {
  api.getCurrentLocation().then((response) => {
    const string = strings.getCaption(response);
    const image = strings.getImage(response);

    logger.addEntryToUserLog(ctx.update, 'location');

    return (
      ctx.replyWithPhoto(image,
        {
          caption: string,
          parse_mode: 'HTML',
        })
    );
  })
    .catch((error) => {
      logger.addEntryToErrorLog(error);
      ctx.replyWithHTML('Sorry, but something went wrong :-(');
    });
});

bot.command('about', (ctx) => ctx.replyWithHTML('Test'));

bot.command('help', (ctx) => ctx.replyWithHTML('Test2'));

// Launch bot
bot.launch();

app.get('/mp', (request, response) => {
  const result = `<pre>🚀 ${name} is running.\n\nversion ${version}</pre>`;
  response.send(result);
}).listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 ${name} running, server is listening on port`, app.get('port'));
});
