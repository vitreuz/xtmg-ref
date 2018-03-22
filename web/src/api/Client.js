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

export function ListGames(callback, params = "") {
  get("/v1/games", data => data.data.games, params).then(callback);
}

const Client = { ListGames };
export default Client;
