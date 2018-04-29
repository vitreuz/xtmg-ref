import * as React from 'react';
import { Ship } from 'client/Ship';

interface PFProps {
  starterShips: Ship[];
  CancelForm: () => void;
  CreatePlayer: (player: PFState) => void;
}

export interface PFState {
  name: string;
  callsign: string;
  ship_xws: string;
}

class PlayerForm extends React.Component<PFProps, PFState> {
  constructor(props: PFProps) {
    super(props);

    this.state = {
      name: '',
      callsign: '',
      ship_xws: ''
    };

    this.setName = this.setName.bind(this);
    this.setCallsign = this.setCallsign.bind(this);
    this.setShipXWS = this.setShipXWS.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setName(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.target.value });
  }

  setCallsign(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ callsign: e.target.value });
  }

  setShipXWS(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ ship_xws: e.target.value });
  }

  handleSubmit() {
    const { CreatePlayer } = this.props;

    CreatePlayer(this.state);
  }

  listShips(ships: Ship[]): (JSX.Element | undefined)[] {
    return ships.map((ship, i) => (
      <option value={ship.xws} key={i}>
        {ship.name}
      </option>
    ));
  }

  render() {
    const { starterShips, CancelForm } = this.props;
    const { callsign, name, ship_xws } = this.state;
    const canSubmit = !!callsign && !!name && !!ship_xws;

    return (
      <form
        className="player-form"
        onSubmit={(e: React.FormEvent<any>) => e.preventDefault()}
      >
        <label className="name-label">
          Name
          <input className="name-input" value={name} onChange={this.setName} />
        </label>
        <label className="name-label">
          Callsign
          <input
            className="callsign-input"
            value={callsign}
            onChange={this.setCallsign}
          />
        </label>
        <label className="name-label">
          Ship
          <select
            className="ship-select"
            value={ship_xws}
            onChange={this.setShipXWS}
          >
            <option value="" />
            {this.listShips(starterShips)}
          </select>
        </label>
        <button
          className="submit-button"
          disabled={!canSubmit}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
        <button className="cancel-button" onClick={CancelForm}>
          Cancel
        </button>
      </form>
    );
  }
}

export default PlayerForm;
