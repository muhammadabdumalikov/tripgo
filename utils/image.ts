export function getProxiedImageUrl(url: string): string {
  // If it's already using our proxy, return as is
  if (url.startsWith('/img/')) {
    return url;
  }

  // Extract the file path from the original URL
  const match = url.match(/travelapp\/(.+)$/);
  if (match) {
    return `/img/${match[1]}`;
  }

  // If no match, return the original URL
  return url;
} 