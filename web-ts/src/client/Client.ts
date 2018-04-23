import { Player } from './Player';

export function get<T>(url: string): Promise<T> {
  return fetch(url)
    .then(status)
    .then(response => response.json());
}

function status(response: Response | undefined) {
  if (response === undefined) {
    return Promise.reject(new Error('empty response'));
  }

  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function ListPlayers() {
  return get<{ data: { players: Player[] } }>('/v1/players').then(
    body => body.data.players
  );
}

const Client = { ListPlayers };
export default Client;
