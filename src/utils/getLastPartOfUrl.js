export function getLinknUrl(url) {
  url = url.replace(/\/+$/, "");
  const parts = url.split("/");
  return parts[parts.length - 1];
}

export function getUsernameFromLinkedInUrl(url) {
  const startIndex = url.lastIndexOf("/") + 1;
  return url.substring(startIndex);
}
