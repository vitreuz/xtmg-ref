import React from "react";
import PropTypes from "prop-types";

export default class NewPlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      callsign: "",
      ship_xws: ""
    };

    this.setName = this.setName.bind(this);
    this.setCallsign = this.setCallsign.bind(this);
    this.setShipXWS = this.setShipXWS.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  setName(name) {
    this.setState({ name: name });
  }

  setCallsign(callsign) {
    this.setState({ callsign: callsign });
  }

  setShipXWS(xws) {
    this.setState({ ship_xws: xws });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  handleCancel(event) {
    event.preventDefault();
    const { onCancel } = this.props;
    onCancel(this.state);
  }

  render() {
    const { name, callsign, ship_xws } = this.state;
    const canSubmit =
      name.length > 0 && callsign.length > 0 && ship_xws.length > 0;

    return (
      <form className="new-player-form" onSubmit={this.handleSubmit}>
        <label>
          Name: <TextInput value={name} onChange={this.setName} />
        </label>
        <label>
          Callsign: <TextInput value={callsign} onChange={this.setCallsign} />
        </label>
        <label>
          Callsign: <ShipSelect value={ship_xws} onChange={this.setShipXWS} />
        </label>
        <input type="submit" value="Submit" disabled={!canSubmit} />
        <button onClick={this.handleCancel}>Cancel</button>
      </form>
    );
  }
}
NewPlayerForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.props.onChange(value);
  }

  render() {
    const { value } = this.props;
    return <input type="text" value={value} onChange={this.handleChange} />;
  }
}
TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export class ShipSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.props.onChange(value);
  }

  render() {
    const { value } = this.props;
    return (
      <select value={value} onChange={this.handleChange}>
        <option value="" />
        <option value="xwing">X-Wing (5 xp)</option>
        <option value="ywing">Y-Wing (8 xp)</option>
      </select>
    );
  }
}
ShipSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
