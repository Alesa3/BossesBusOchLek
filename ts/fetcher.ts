export default async function fetcher(path: string) {
  const base = "http://46.101.130.27/wp-json";
  console.log(`Full url: ${base+path}`)
  const res = await fetch(base + path);
  const data = await res.json();
  console.log(data);
  return data;
}
