const toTitleCase = (phrase) => phrase
  .toLowerCase()
  .split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const getCaption = (response) => {
  const { data } = response.data;
  const dateString = data.date;
  const date = new Date(dateString).toLocaleDateString();
  const { location } = data.current_location.data;
  const { region } = location;
  const nearBy = location.near_by;

  const string = `<b>Current Madam Nazar Position</b>\nRegion: ${toTitleCase(region.name)}\nPrecise location: ${toTitleCase(region.precise)}\nNear by: ${toTitleCase(nearBy.join(', '))}\nupdated: ${date}`;

  return string;
};

const getImage = (response) => {
  const { data } = response.data;
  const { location } = data.current_location.data;
  const { image } = location;

  return image;
};

module.exports = {
  getCaption,
  getImage,
};
