function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

function get(endpoint, params = "") {
  if (params.length > 0) {
    endpoint = endpoint + "?" + params;
  }
  return fetch(endpoint)
    .then(status)
    .then(json)
    .catch(error => console.error(error));
}

function post(endpoint, body) {
  return fetch(endpoint, {
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    cache: "no-cache"
  })
    .then(status)
    .then(json)
    .catch(error => console.error(error));
}

function put(endpoint, body) {
  return fetch(endpoint, {
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json"
    },
    method: "PUT",
    cache: "no-cache"
  })
    .then(status)
    .then(json)
    .catch(error => console.error(error));
}

function ListGames(callback, params = "") {
  get("/v1/games", params)
    .then(data => data.data.games)
    .then(callback);
}

function CreateGame(body, callback) {
  post("/v1/games", body)
    .then(game => game.data)
    .then(callback);
}

function UpdateGame(id, body, callback) {
  put(`/v1/games/${id}`, body)
    .then(game => game.data)
    .then(callback);
}

const Client = { CreateGame, ListGames, UpdateGame };
export default Client;
