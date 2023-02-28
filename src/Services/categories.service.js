const url = "http://localhost:3000";

async function getAllCategories() {
  const res = await fetch(`${url}/categories`);

  const json = await res.json();

  return json;
}

export { getAllCategories };
