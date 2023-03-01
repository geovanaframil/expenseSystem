export default async function addNewExpense() {
  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initExpense = {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      name: categoryName,
      categoryID: categoryID,
      userID: userId,
      amount: amountValue,
    }),
  };

  let response = await fetch(`${url}/expenses`, initExpense);

  if (response.ok) {
    let dataExpense = await response.json();
    return dataExpense;
  } else {
    await response.text();
  }
}