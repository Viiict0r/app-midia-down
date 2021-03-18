export const URLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;

export const isURL = (url: string): boolean => {
  if (!url) return false;

  return URLRegex.test(url);
};
