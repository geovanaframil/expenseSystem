const url = 'http://localhost:3000';

export async function getAllUsers() {
    const res = await fetch(`${url}/users`);

    const json = await res.json();

    return json;
}

export async function getUser(id) {
    const res = await fetch(`${url}/users/${id}`);

    const json = await res.json();

    return json;
}
