// One formatter for every date on the site, built once: constructing an
// Intl.DateTimeFormat is the expensive part, and blog listings call this per
// card per render.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00Z`);
  // toLocaleDateString returned "Invalid Date" here; Intl's format() throws.
  return Number.isNaN(date.getTime()) ? "Invalid Date" : dateFormatter.format(date);
}
