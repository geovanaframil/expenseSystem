const url = "http://localhost:3000";

export default async function fetchDeleteExpense(id) {
  await fetch(`${url}/expenses/${id}`, { method: "DELETE" });
}
