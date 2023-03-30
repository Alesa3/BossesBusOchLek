export default async function fetcher(path: string) {
  const base = "http://46.101.130.27/wp-json";
  const res = await fetch(base + path);
  const data = await res.json();
  return data;
}
