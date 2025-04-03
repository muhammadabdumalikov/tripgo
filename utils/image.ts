export const getProxiedImageUrl = (url: string) => {
  if (!url) return '';

  // If the URL is already a full URL, return it as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If it's a relative URL from the API server, construct the full URL
  return `http://116.202.26.85:9000/travelapp${url}`;
}; 