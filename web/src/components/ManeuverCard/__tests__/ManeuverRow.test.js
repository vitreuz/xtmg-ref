import React from "react";
import { mount, shallow } from "enzyme";
import "jest-enzyme";
import { ManeuverRow, ManeuverCell } from "../ManeuverCard";
import { join } from "path";

describe("ManeuverRow", () => {
  let row = [];
  let speed;

  describe("when minimum values are provided", () => {
    beforeEach(() => {
      row = [].concat([{ bearing: "bankleft", difficulty: null }]);
      speed = 0;
    });

    it("renders a row full of empty squares with a 0 speed cell", () => {
      const wrapper = shallow(<ManeuverRow row={row} speed={speed} />);

      expect(wrapper).toMatchElement(
        <div className="maneuver-row">
          <div className="speed-cell">0</div>
          <ManeuverCell bearing={"bankleft"} difficulty={null} />
        </div>
      );
    });
  });

  describe("when speed is greater than 0", () => {
    beforeEach(() => {
      speed = 1;
    });

    describe("when the row is of length 6", () => {
      beforeEach(() => {
        row = [].concat([
          { bearing: "turnleft", difficulty: null },
          { bearing: "bankleft", difficulty: "white" },
          { bearing: "straight", difficulty: "green" },
          { bearing: "bankright", difficulty: "white" },
          { bearing: "turnright", difficulty: null },
          { bearing: "kturn", difficulty: "red" }
        ]);
      });

      it("renders a simple maneuever-row", () => {
        const wrapper = shallow(<ManeuverRow row={row} speed={speed} />);

        expect(wrapper).toMatchElement(
          <div className="maneuver-row">
            <div className="speed-cell">1</div>
            <ManeuverCell bearing={"turnleft"} difficulty={null} />
            <ManeuverCell bearing={"bankleft"} difficulty={"white"} />
            <ManeuverCell bearing={"straight"} difficulty={"green"} />
            <ManeuverCell bearing={"bankright"} difficulty={"white"} />
            <ManeuverCell bearing={"turnright"} difficulty={null} />
            <ManeuverCell bearing={"kturn"} difficulty={"red"} />
          </div>
        );
      });
    });

    describe("when the row is of greater than length 6", () => {
      beforeEach(() => {
        row = [].concat([
          { bearing: "turnleft", difficulty: null },
          { bearing: "bankleft", difficulty: "white" },
          { bearing: "straight", difficulty: "green" },
          { bearing: "bankright", difficulty: "white" },
          { bearing: "turnright", difficulty: null },
          { bearing: "kturn", difficulty: "red" },
          { bearing: "sloopleft", difficulty: "red" },
          { bearing: "sloopright", difficulty: "red" },
          { bearing: "trollleft", difficulty: "red" },
          { bearing: "trollright", difficulty: "red" }
        ]);
      });

      it("renders the manuever-row from right to left, with troll outermost and kturn last", () => {
        const wrapper = shallow(<ManeuverRow row={row} speed={speed} />);

        expect(wrapper).toMatchElement(
          <div className="maneuver-row">
            <div className="speed-cell">1</div>
            <ManeuverCell bearing={"trollleft"} difficulty={"red"} />
            <ManeuverCell bearing={"sloopleft"} difficulty={"red"} />
            <ManeuverCell bearing={"turnleft"} difficulty={null} />
            <ManeuverCell bearing={"bankleft"} difficulty={"white"} />
            <ManeuverCell bearing={"straight"} difficulty={"green"} />
            <ManeuverCell bearing={"bankright"} difficulty={"white"} />
            <ManeuverCell bearing={"turnright"} difficulty={null} />
            <ManeuverCell bearing={"sloopright"} difficulty={"red"} />
            <ManeuverCell bearing={"trollright"} difficulty={"red"} />
            <ManeuverCell bearing={"kturn"} difficulty={"red"} />
          </div>
        );
      });
    });
  });

  describe("when speed is 0", () => {
    beforeEach(() => {
      speed = 0;
    });

    describe("with a stop maneuver", () => {
      beforeEach(() => {
        row = [].concat([
          { bearing: "turnleft", difficulty: null },
          { bearing: "bankleft", difficulty: null },
          { bearing: "straight", difficulty: "red" },
          { bearing: "bankright", difficulty: null },
          { bearing: "turnright", difficulty: null },
          { bearing: "kturn", difficulty: null }
        ]);
      });

      it("renders with a stop cell", () => {
        const wrapper = shallow(<ManeuverRow row={row} speed={speed} />);

        expect(wrapper).toMatchElement(
          <div className="maneuver-row">
            <div className="speed-cell">0</div>
            <ManeuverCell bearing={"turnleft"} difficulty={null} />
            <ManeuverCell bearing={"bankleft"} difficulty={null} />
            <ManeuverCell bearing={"stop"} difficulty={"red"} />
            <ManeuverCell bearing={"bankright"} difficulty={null} />
            <ManeuverCell bearing={"turnright"} difficulty={null} />
            <ManeuverCell bearing={"kturn"} difficulty={null} />
          </div>
        );
      });
    });
  });

  describe("when speed is less than 0", () => {
    beforeEach(() => {
      speed = -1;
    });

    describe("with reverse maneuvers", () => {
      beforeEach(() => {
        row = [].concat([
          { bearing: "bankleft", difficulty: "red" },
          { bearing: "straight", difficulty: "red" },
          { bearing: "bankright", difficulty: "red" }
        ]);
      });

      it("renders the reverse maneuvers", () => {
        const wrapper = shallow(<ManeuverRow row={row} speed={speed} />);

        expect(wrapper).toMatchElement(
          <div className="maneuver-row">
            <div className="speed-cell">-1</div>
            <ManeuverCell bearing={"reversebankleft"} difficulty={"red"} />
            <ManeuverCell bearing={"reversestraight"} difficulty={"red"} />
            <ManeuverCell bearing={"reversebankright"} difficulty={"red"} />
          </div>
        );
      });
    });
  });
});
