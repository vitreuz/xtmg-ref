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

function get(endpoint, callback, params = "") {
  if (params.length > 0) {
    endpoint = endpoint + "?" + params;
  }
  return fetch(endpoint)
    .then(status)
    .then(json)
    .then(callback)
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

function ListGames(callback, params = "") {
  get("/v1/games", data => data.data.games, params).then(callback);
}

function CreateGame(body, callback) {
  post("/v1/games", body)
    .then(game => game.data)
    .then(callback);
}

const Client = { ListGames, CreateGame };
export default Client;
