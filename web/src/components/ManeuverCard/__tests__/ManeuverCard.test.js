import React from "react";
import { shallow } from "enzyme";
import ManeuverCard from "../ManeuverCard";
import { ManeuverRow } from "../ManeuverCard";

describe("ManeuverCard", () => {
  let maneuvers;

  describe("when passed empty maneuvers", () => {
    beforeEach(() => {
      maneuvers = Array(5).fill([]);
    });

    it("renders 5 rows starting at speed 1", () => {
      const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

      // TODO: fix this test if this issue gets fixed
      expect(wrapper).toMatchElement(
        <div className="maneuver-table">
          <ManeuverRow row={[]} speed={1} />
          <ManeuverRow row={[]} speed={2} />
          <ManeuverRow row={[]} speed={3} />
          <ManeuverRow row={[]} speed={4} />
          <ManeuverRow row={[]} speed={5} />
        </div>
      );

      [0, 1, 2, 3, 4].map(i => {
        const row = wrapper.find("ManeuverRow").at(i);
        expect(row).toBePresent();
        expect(row).toHaveProp("row", [0, 0, 0, 0, 0, 0]);
      });
    });
  });

  describe("when passed populated manuevers", () => {
    describe("when the manuever chart has no negatives", () => {
      describe("when the 0 field is empty", () => {
        beforeEach(() => {
          maneuvers = [
            [],
            [0, 2, 2, 2],
            [1, 1, 2, 1, 1],
            [1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 3]
          ];
        });

        it("should render the maneuvers from speed 1 to 5", () => {
          const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

          // TODO: fix this test if this issue gets fixed
          expect(wrapper).toMatchElement(
            <div className="maneuver-table">
              <ManeuverRow row={[]} speed={1} />
              <ManeuverRow row={[]} speed={2} />
              <ManeuverRow row={[]} speed={3} />
              <ManeuverRow row={[]} speed={4} />
              <ManeuverRow row={[]} speed={5} />
            </div>
          );

          const row = wrapper.find("ManeuverRow").at(0);
          expect(row).toBePresent();
          expect(row).toHaveProp("row", [0, 2, 2, 2, 0, 0]);
        });
      });

      describe("when the 0 field is populated", () => {
        beforeEach(() => {
          maneuvers = [[0, 0, 3], [0, 2, 2, 2], [3, 1, 2, 1, 3], [0, 3, 1, 3]];
        });

        it("should render the maneuvers from speed 0 to 4", () => {
          const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

          // TODO: fix this test if this issue gets fixed
          expect(wrapper).toMatchElement(
            <div className="maneuver-table">
              <ManeuverRow row={[]} speed={0} />
              <ManeuverRow row={[]} speed={1} />
              <ManeuverRow row={[]} speed={2} />
              <ManeuverRow row={[]} speed={3} />
              <ManeuverRow row={[]} speed={4} />
            </div>
          );

          const row = wrapper.find("ManeuverRow").at(0);
          expect(row).toBePresent();
          expect(row).toHaveProp("row", [0, 0, 3, 0, 0, 0]);
        });
      });
    });

    describe("when the manuever chart has negatives", () => {
      beforeEach(() => {
        maneuvers = [
          [],
          [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 3, 3, 3],
          [1, 2, 2, 2, 1, 0, 3, 3],
          [0, 1, 2, 1]
        ];
      });

      it("should render the maneuvers from speed -1 to 3", () => {
        const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

        // TODO: fix this test if this issue gets fixed
        expect(wrapper).toMatchElement(
          <div className="maneuver-table">
            <ManeuverRow row={[]} speed={-1} />
            <ManeuverRow row={[]} speed={0} />
            <ManeuverRow row={[]} speed={1} />
            <ManeuverRow row={[]} speed={2} />
            <ManeuverRow row={[]} speed={3} />
          </div>
        );

        const row = wrapper.find("ManeuverRow").at(0);
        expect(row).toBePresent();
        expect(row).toHaveProp("row", [0, 3, 3, 3, 0, 0, 0, 0]);
      });
    });
  });
});
