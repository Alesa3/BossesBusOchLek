export async function fetcher(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  console.log("inside func", data)
  return data
}