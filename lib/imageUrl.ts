export const getImageUrl = (url: string): string => {
  if (url.startsWith('/') && !url.startsWith('//')) {
    return `${import.meta.env.BASE_URL}${url.slice(1)}`;
  }
  return url;
};
