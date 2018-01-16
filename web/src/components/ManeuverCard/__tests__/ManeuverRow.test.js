import React from "react";
import { mount, shallow } from "enzyme";
import "jest-enzyme";

import { ManeuverRow } from "../ManeuverRow";
import { BearingCell, EmptyCell, SpeedCell } from "../ManeuverCell";

describe("ManeuverRow", () => {
  let row = [];
  let speed;
  let hasSloop;
  let hasTroll;

  beforeEach(() => {
    hasSloop = false;
    hasTroll = false;
  });

  describe("when minimum values are provided", () => {
    beforeEach(() => {
      row = [].concat([0, 0, 0, 0, 0, 0]);
      speed = 1;
    });

    it("renders a row full of empty squares with a 1 speed cell", () => {
      const wrapper = shallow(
        <ManeuverRow
          row={row}
          speed={speed}
          hasSloop={hasSloop}
          hasTroll={hasTroll}
        />
      );

      expect(wrapper).toMatchElement(
        <tr className="maneuver-row">
          <SpeedCell speed={1} />
          <EmptyCell />
          <EmptyCell />
          <EmptyCell />
          <EmptyCell />
          <EmptyCell />
          <EmptyCell />
        </tr>
      );
    });
  });

  describe("when speed is greater than 0", () => {
    beforeEach(() => {
      speed = 1;
    });

    describe("when the row is of length 6", () => {
      beforeEach(() => {
        row = [].concat([0, 1, 2, 1, 0, 3]);
        hasSloop = false;
        hasTroll = false;
      });

      it("renders a simple maneuever-row", () => {
        const wrapper = shallow(
          <ManeuverRow
            row={row}
            speed={speed}
            hasSloop={hasSloop}
            hasTroll={hasTroll}
          />
        );

        expect(wrapper).toMatchElement(
          <tr className="maneuver-row">
            <SpeedCell speed={1} />
            <EmptyCell />
            <BearingCell bearing={"bankleft"} difficulty={"white"} />
            <BearingCell bearing={"straight"} difficulty={"green"} />
            <BearingCell bearing={"bankright"} difficulty={"white"} />
            <EmptyCell />
            <BearingCell bearing={"kturn"} difficulty={"red"} />
          </tr>
        );
      });
    });

    describe("when the row is of greater than length 6", () => {
      describe("when the row contians sloops and trolls", () => {
        beforeEach(() => {
          row = [].concat([0, 1, 2, 1, 0, 3, 3, 3, 3, 3]);
          hasSloop = true;
          hasTroll = true;
        });

        it("renders the manuever-row from right to left, with troll outermost and kturn last", () => {
          const wrapper = shallow(
            <ManeuverRow
              row={row}
              speed={speed}
              hasSloop={hasSloop}
              hasTroll={hasTroll}
            />
          );

          expect(wrapper).toMatchElement(
            <tr className="maneuver-row">
              <SpeedCell speed={1} />
              <BearingCell bearing={"trollleft"} difficulty={"red"} />
              <BearingCell bearing={"sloopleft"} difficulty={"red"} />
              <EmptyCell />
              <BearingCell bearing={"bankleft"} difficulty={"white"} />
              <BearingCell bearing={"straight"} difficulty={"green"} />
              <BearingCell bearing={"bankright"} difficulty={"white"} />
              <EmptyCell />
              <BearingCell bearing={"sloopright"} difficulty={"red"} />
              <BearingCell bearing={"trollright"} difficulty={"red"} />
              <BearingCell bearing={"kturn"} difficulty={"red"} />
            </tr>
          );
        });
      });
      describe("when the row contians only trolls", () => {
        beforeEach(() => {
          row = [].concat([0, 1, 2, 1, 0, 3, 0, 0, 3, 3]);
          hasTroll = true;
        });

        it("renders the manuever-row from right to left, with troll outermost and kturn last", () => {
          const wrapper = shallow(
            <ManeuverRow
              row={row}
              speed={speed}
              hasSloop={hasSloop}
              hasTroll={hasTroll}
            />
          );

          expect(wrapper).toMatchElement(
            <tr className="maneuver-row">
              <SpeedCell speed={1} />
              <BearingCell bearing={"trollleft"} difficulty={"red"} />
              <EmptyCell />
              <BearingCell bearing={"bankleft"} difficulty={"white"} />
              <BearingCell bearing={"straight"} difficulty={"green"} />
              <BearingCell bearing={"bankright"} difficulty={"white"} />
              <EmptyCell />
              <BearingCell bearing={"trollright"} difficulty={"red"} />
              <BearingCell bearing={"kturn"} difficulty={"red"} />
            </tr>
          );
        });
      });
    });
  });

  describe("when speed is 0", () => {
    beforeEach(() => {
      speed = 0;
    });

    describe("with a stop maneuver", () => {
      beforeEach(() => {
        row = [].concat([0, 0, 3, 0, 0, 0]);
      });

      it("renders with a stop cell", () => {
        const wrapper = shallow(
          <ManeuverRow
            row={row}
            speed={speed}
            hasSloop={hasSloop}
            hasTroll={hasTroll}
          />
        );

        expect(wrapper).toMatchElement(
          <tr className="maneuver-row">
            <SpeedCell speed={0} />
            <EmptyCell />
            <EmptyCell />
            <BearingCell bearing={"stop"} difficulty={"red"} />
            <EmptyCell />
            <EmptyCell />
            <EmptyCell />
          </tr>
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
        row = [].concat([0, 3, 3, 3, 0, 0]);
      });

      it("renders the reverse maneuvers", () => {
        const wrapper = shallow(
          <ManeuverRow
            row={row}
            speed={speed}
            hasSloop={hasSloop}
            hasTroll={hasTroll}
          />
        );

        expect(wrapper).toMatchElement(
          <tr className="maneuver-row">
            <SpeedCell speed={-1} />
            <EmptyCell />
            <BearingCell bearing={"reversebankleft"} difficulty={"red"} />
            <BearingCell bearing={"reversestraight"} difficulty={"red"} />
            <BearingCell bearing={"reversebankright"} difficulty={"red"} />
            <EmptyCell />
            <EmptyCell />
          </tr>
        );
      });
    });
  });
});
