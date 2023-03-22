export default async function fetcher(endURL: string) {
  const originURL = "http://46.101.130.27/wp-json";
  const res = await fetch(originURL + endURL);
  const data = await res.json();
  console.log(data);
  return data;
}
