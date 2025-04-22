export const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

export const extractMetaDescription = (content: string, maxLength = 160) =>
  content.replace(/(<([^>]+)>)/gi, "").substring(0, maxLength);
export const extractMetaKeywords = (content: string) =>
  content
    .replace(/(<([^>]+)>)/gi, "")
    .split(" ")
    .slice(0, 10)
    .join(", ");
export const extractMetaTitle = (content: string) =>
  content.replace(/(<([^>]+)>)/gi, "").substring(0, 60);
export const extractMetaImage = (content: string) => {
  const image = content.match(/<img[^>]+src="([^">]+)"/);
  return image ? image[1] : "";
};
export const extractMetaAuthor = (content: string) => {
  const author = content.match(/<author>(.*?)<\/author>/);
  return author ? author[1] : "";
};
export const extractMetaDate = (content: string) => {
  const date = content.match(/<date>(.*?)<\/date>/);
  return date ? date[1] : "";
};
export const extractMetaTags = (content: string) => {
  const tags = content.match(/<tags>(.*?)<\/tags>/);
  return tags ? tags[1].split(",") : [];
};
export const extractMetaUrl = (content: string) => {
  const url = content.match(/<url>(.*?)<\/url>/);
  return url ? url[1] : "";
};
export const extractMetaCanonical = (content: string) => {
  const canonical = content.match(/<canonical>(.*?)<\/canonical>/);
  return canonical ? canonical[1] : "";
};
export const extractMetaRobots = (content: string) => {
  const robots = content.match(/<robots>(.*?)<\/robots>/);
  return robots ? robots[1] : "";
};
export const extractMetaPublishedAt = (content: string) => {
  const publishedAt = content.match(/<publishedAt>(.*?)<\/publishedAt>/);
  return publishedAt ? publishedAt[1] : "";
};
export const extractMetaPublished = (content: string) => {
  const published = content.match(/<published>(.*?)<\/published>/);
  return published ? published[1] : "";
};
export const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};