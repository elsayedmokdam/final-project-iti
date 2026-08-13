export default function formatTitle (title, maxLength = 30) {
  if (!title) return "";
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};
