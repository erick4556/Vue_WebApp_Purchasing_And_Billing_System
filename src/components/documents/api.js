const SERVER_URL = "http://127.0.0.1:8000/rest/v1/";
const DOCS_URL = SERVER_URL + "docs/";
const TOKEN_URL = SERVER_URL + "token/";
const USUARIO = "erick";
const PASSWORD = "12345678";
const credenciales = { username: USUARIO, password: PASSWORD };

const getToken = async () => {
  try {
    const r = await fetch(TOKEN_URL, {
      method: "POST",
      body: JSON.stringify(credenciales),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = await r.json(); //Para que procese la respuesta en json
    return token;
  } catch (error) {
    console.warn(error.message);
    return error.message;
  }
};

const getAll = async () => {
  const token = await getToken();

  if (typeof token === "string") {
    return token;
  } else {
    const res = await fetch(DOCS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access,
      },
    });

    const items = await res.json();
    console.log(items);
    return items;
  }
};

const insertDoc = async (doc) => {
  const token = await getToken();

  if (typeof token === "string") {
    return token;
  }

  const res = await fetch(DOCS_URL, {
    method: "POST",
    body: JSON.stringify(doc),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.access,
    },
  });

  console.log(res);

  if (!res.ok) {
    return res.statusText;
  }

  const item = await res.json();
  return item;
};

const updateDoc = async (doc) => {
  const token = await getToken();
  const url = DOCS_URL + doc.id + "/";

  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(doc),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.access,
    },
  });

  if (!res.ok) {
    return res.statusText;
  }

  const item = await res.json();
  return item;
};

const deleteDoc = async (id) => {
  const token = await getToken();
  const url = DOCS_URL + id + "/";

  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token.access,
    },
  }).catch((err) => console.error("Error", err));
};

export default {
  getAll,
  insertDoc,
  updateDoc,
  deleteDoc,
};
