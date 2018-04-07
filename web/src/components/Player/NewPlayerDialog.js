import React from "react";
import Modal from "../Modal";

export default class NewPlayerDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      callsign: "",
      ship_xws: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    console.log(name, value);

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault(); // default submit causes a refresh mid request
    const { onSubmit } = this.props;

    await onSubmit(this.state);
  }

  render() {
    let name = "callsign";
    console.log(this.state[name]);
    const { show, onSubmit, onCancel } = this.props;
    return (
      <div className="new-player-modal">
        <Modal show={show}>
          <form className="new-player-form" onSubmit={this.handleSubmit}>
            <label>
              Name: <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
            </label>
            <label>
              Callsign:{" "}
              <input type="text" name="callsign" value={this.state.callsign} onChange={this.handleInputChange} />
            </label>
            <label>
              Ship:
              <select type="text" name="ship_xws" value={this.state.ship_xws} onChange={this.handleInputChange}>
                <option value="" />
                <option value="xwing">X-Wing</option>
                <option value="ywing">Y-Wing</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}
