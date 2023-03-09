const url = "http://localhost:3000";

export default async function fetchEditCategory(body, id) {
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
