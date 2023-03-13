const url = "http://localhost:3000";

async function addNewCategory(body) {
  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initExpense = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(body),
  };

  let response = await fetch(`${url}/categories`, initExpense);

  if (response.ok) {
    let dataExpense = await response.json();
    return dataExpense;
  } else {
    await response.text();
  }
}

async function getAllCategories() {
  const res = await fetch(`${url}/categories`);

  const json = await res.json();

  return json;
}

async function fetchEditCategory(body, id) {
  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initCategory = {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(body),
  };

  let response = await fetch(`${url}/categories/${id}`, initCategory);

  if (response.ok) {
    let dataExpense = await response.json();
    return dataExpense;
  } else {
    await response.text();
  }
}

async function fetchDeleteCategory(id) {
  await fetch(`${url}/categories/${id}`, { method: "DELETE" });
}

export {
  getAllCategories,
  fetchEditCategory,
  fetchDeleteCategory,
  addNewCategory,
};
