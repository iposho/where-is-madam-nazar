const { version } = require('../package.json');

const toTitleCase = (phrase) => phrase
  .toLowerCase()
  .split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const getCaption = (response) => {
  const { data } = response;
  const { location } = data.data;
  const { region } = location;
  const nearBy = location.near_by;

  const string = `<b>Madam Nazar's current location</b>\n\nRegion: ${toTitleCase(region.name)}\nPrecise location: ${toTitleCase(region.precise)}\nNear by: ${toTitleCase(nearBy.join(', '))}\n\n<i>Updated: ${data.dataFor}</i>`;

  return string;
};

const getImage = (response) => {
  const { data } = response;
  const { location } = data.data;
  const { image } = location;

  return image;
};

const getAboutString = () => {
  const aboutString = `Madam Nazar's current location for Red Dead Redemption 2: Online.\n\nVersion: ${version}\n\nAuthor: Pavel Kuzyakin\n\nRepo: https://github.com/iposho/where-is-madam-nazar.git`;

  return aboutString;
};

const getStartMessage = (ctx) => {
  const firstName = ctx.update.message.from.first_name;
  const message = `Hi, ${firstName}!\n\nBot version is ${version}.\n\n<b>If you want to see Madam Nazar's current location, send /location command</b>`;

  return message;
};

module.exports = {
  getAboutString,
  getCaption,
  getImage,
  getStartMessage,
};
