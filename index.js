// Telegraf's imports
const { Telegraf } = require('telegraf');

// Tools
const logger = require('./config/logger');
const strings = require('./config/strings');
const api = require('./config/requests');

require('dotenv').config();

// Init bot
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  logger.addEntryToUserLog(ctx.update);

  return ctx.replyWithHTML(strings.getStartMessage(ctx));
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

bot.command('about', (ctx) => {
  logger.addEntryToUserLog(ctx.update, 'about');
  return ctx.replyWithHTML(strings.getAboutString(), {
    disable_web_page_preview: true,
  });
});

// Launch bot
bot.launch();
