const BLACKLIST_KEY = 'blacklisted_images';

export function getBlacklist() {
  try {
    const blacklist = localStorage.getItem(BLACKLIST_KEY);
    return blacklist ? JSON.parse(blacklist) : [];
  } catch (error) {
    return [];
  }
};

export function addToBlacklist(imageURL) {
  try {
    const blacklist = getBlacklist();
    if (!blacklist.includes(imageURL)) {
      blacklist.push(imageURL);
      localStorage.setItem(BLACKLIST_KEY, JSON.stringify(blacklist));
    }
  } catch (error) {
    console.log('Ошибка при добавлении в черный список:', error);
  }
};

export function isBlacklisted(imageURL) {
  const blacklist = getBlacklist();
  return blacklist.includes(imageURL);
};