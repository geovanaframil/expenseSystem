const url = "http://localhost:3000";

export default async function fetchDeleteCategory(id) {
  await fetch(`${url}/categories/${id}`, { method: "DELETE" });
}
