const url = "http://localhost:3000";

export default async function addNewUser(body) {
    const headers = new Headers();
  
    headers.append("content-type", "application/json");
  
    const initExpense = {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body),
    };
  
    let response = await fetch(`${url}/users`, initExpense);
  
    if (response.ok) {
      let dataExpense = await response.json();
      return dataExpense;
    } else {
      await response.text();
    }
  }