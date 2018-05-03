import { Player } from './Player';
import { Upgrade } from './Upgrade';
import { Config } from './Config';

export function get<T>(url: string, params?: Object): Promise<T> {
  if (!!params) {
    const encodedQuery = queryParams(params);
    url = url.concat('?', encodedQuery);
  }

  return fetch(url)
    .then(status)
    .then(response => response.json());
}

function queryParams(params: Object): string {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
}

export function post<T>(url: string, body: Object): Promise<T> {
  return fetch(url, { body: JSON.stringify(body), method: 'POST' })
    .then(status)
    .then(response => response.json());
}

export function put(url: string, body: Object): Promise<void> {
  return fetch(url, { body: JSON.stringify(body), method: 'PUT' })
    .then(status)
    .then(() => {
      return;
    });
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

function FetchConfig(): Promise<Config> {
  return get<{ data: { config: Config } }>(`/v1/config`).then(
    body => body.data.config
  );
}

export interface CreatePlayerReq {
  name: string;
  callsign: string;
  ship_xws: string;
}

function CreatePlayer(req: CreatePlayerReq): Promise<string> {
  return post<{ data: { id: string } }>(`/v1/players`, req).then(
    body => body.data.id
  );
}

function ListPlayers() {
  return get<{ data: { players: Player[] } }>('/v1/players').then(
    body => body.data.players
  );
}

function FetchPlayer(playerID: string): Promise<Player> {
  return get<{ data: { player: Player } }>(`/v1/players/${playerID}`).then(
    body => body.data.player
  );
}

export interface UpdatePlayerReq {
  slots: ({ add: number } | { rem: number })[];
}

function UpdatePlayer(playerID: string, req: UpdatePlayerReq): Promise<void> {
  return put(`/v1/players/${playerID}`, req);
}

function UpdatePlayerHangar(
  playerID: string,
  req: UpdatePlayerReq
): Promise<void> {
  return put(`/v1/players/${playerID}/hangar`, req);
}

export interface UpgradesQuery {
  owned?: boolean;
  player_id?: string;
}

function ListUpgrades(query: UpgradesQuery) {
  return get<{ data: { upgrades: Upgrade[] } }>(`/v1/upgrades`, query).then(
    body => body.data.upgrades
  );
}

const Client = {
  FetchConfig,

  CreatePlayer,
  ListPlayers,
  FetchPlayer,
  UpdatePlayer,
  UpdatePlayerHangar,

  ListUpgrades
};
export default Client;
