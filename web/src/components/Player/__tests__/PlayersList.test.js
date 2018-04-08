import React from "react";
import { shallow } from "enzyme";

import PlayersList from "../PlayerList";
import { Player } from "../PlayerList";
import NewPlayerForm from "../NewPlayerForm";
import Modal from "../../Modal";

describe("PlayersList", () => {
  let players = [];

  describe("when given no players", () => {
    beforeEach(() => {
      players = [];
    });

    it("should render only the `NewPlayer` button and a closed Modal", () => {
      const wrapper = shallow(
        <PlayersList players={players} onNewPlayer={() => {}} />
      );

      expect(wrapper).toMatchElement(
        <div>
          <ul>
            <li>
              <button>New Player</button>
            </li>
          </ul>
          <Modal>
            <NewPlayerForm />
          </Modal>
        </div>
      );
    });
  });

  describe("when given a list of players", () => {
    beforeEach(() => {
      players = [
        {
          callsign: "some-callsign",
          current_xp: 0,
          name: "some-name",
          pilot_skill: 0,
          ships: [],
          upgrades: []
        },
        {
          callsign: "some-callsign",
          current_xp: 0,
          name: "some-name",
          pilot_skill: 0,
          ships: [],
          upgrades: []
        }
      ];
    });

    it("should render a list of players and the `New Player` button", () => {
      const wrapper = shallow(
        <PlayersList players={players} onNewPlayer={() => {}} />
      );

      expect(wrapper).toMatchElement(
        <div>
          <ul>
            <li>
              <Player />
            </li>
            <li>
              <Player />
            </li>
            <li>
              <button>New Player</button>
            </li>
          </ul>
          <Modal>
            <NewPlayerForm />
          </Modal>
        </div>
      );
    });
  });

  describe("when using the `New Player` button", () => {
    it("should change the state of `modalIsOpen` to true", () => {
      const wrapper = shallow(<PlayersList players={players} />);

      expect(wrapper).toHaveState("modalIsOpen", false);
      const button = wrapper.find("button");
      button.simulate("click");
      expect(wrapper).toHaveState("modalIsOpen", true);
    });
  });
});
