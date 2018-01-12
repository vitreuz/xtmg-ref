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
        <table className="maneuver-table">
          <tbody>
            <ManeuverRow hasSloop={false} hasTroll={false} row={[]} speed={5} />
            <ManeuverRow hasSloop={false} hasTroll={false} row={[]} speed={4} />
            <ManeuverRow hasSloop={false} hasTroll={false} row={[]} speed={3} />
            <ManeuverRow hasSloop={false} hasTroll={false} row={[]} speed={2} />
            <ManeuverRow hasSloop={false} hasTroll={false} row={[]} speed={1} />
          </tbody>
        </table>
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

        it("should render the maneuvers from speed 5 to 1", () => {
          const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

          // TODO: fix this test if this issue gets fixed
          expect(wrapper).toMatchElement(
            <table className="maneuver-table">
              <tbody>
                <ManeuverRow
                  hasSloop={false}
                  hasTroll={false}
                  row={[]}
                  speed={5}
                />
                <ManeuverRow
                  hasSloop={false}
                  hasTroll={false}
                  row={[]}
                  speed={4}
                />
                <ManeuverRow
                  hasSloop={false}
                  hasTroll={false}
                  row={[]}
                  speed={3}
                />
                <ManeuverRow
                  hasSloop={false}
                  hasTroll={false}
                  row={[]}
                  speed={2}
                />
                <ManeuverRow
                  hasSloop={false}
                  hasTroll={false}
                  row={[]}
                  speed={1}
                />
              </tbody>
            </table>
          );

          const row = wrapper.find("ManeuverRow").at(4);
          expect(row).toBePresent();
          expect(row).toHaveProp("row", [0, 2, 2, 2, 0, 0]);
        });
      });

      describe("when the 0 field is populated", () => {
        beforeEach(() => {
          maneuvers = [[0, 0, 3], [0, 2, 2, 2], [3, 1, 2, 1, 3], [0, 3, 1, 3]];
        });

        it("should render the maneuvers from speed 4 to 0", () => {
          const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

          // TODO: fix this test if this issue gets fixed
          expect(wrapper).toMatchElement(
            <table className="maneuver-table">
              <tbody>
                <ManeuverRow
                  hasSloop={false}
                  hasTroll={false}
                  row={[]}
                  speed={4}
                />
                <ManeuverRow
                  hasSloop={false}
                  hasTroll={false}
                  row={[]}
                  speed={3}
                />
                <ManeuverRow
                  hasSloop={false}
                  hasTroll={false}
                  row={[]}
                  speed={2}
                />
                <ManeuverRow
                  hasSloop={false}
                  hasTroll={false}
                  row={[]}
                  speed={1}
                />
                <ManeuverRow
                  hasSloop={false}
                  hasTroll={false}
                  row={[]}
                  speed={0}
                />
              </tbody>
            </table>
          );

          const row = wrapper.find("ManeuverRow").at(4);
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

      it("should render the maneuvers from speed 3 to -1", () => {
        const wrapper = shallow(<ManeuverCard maneuvers={maneuvers} />);

        // TODO: fix this test if this issue gets fixed
        expect(wrapper).toMatchElement(
          <table className="maneuver-table">
            <tbody>
              <ManeuverRow
                hasSloop={true}
                hasTroll={false}
                row={[]}
                speed={3}
              />
              <ManeuverRow
                hasSloop={true}
                hasTroll={false}
                row={[]}
                speed={2}
              />
              <ManeuverRow
                hasSloop={true}
                hasTroll={false}
                row={[]}
                speed={1}
              />
              <ManeuverRow
                hasSloop={true}
                hasTroll={false}
                row={[]}
                speed={0}
              />
              <ManeuverRow
                hasSloop={true}
                hasTroll={false}
                row={[]}
                speed={-1}
              />
            </tbody>
          </table>
        );

        const row = wrapper.find("ManeuverRow").at(4);
        expect(row).toBePresent();
        expect(row).toHaveProp("row", [0, 3, 3, 3, 0, 0, 0, 0]);
      });
    });
  });
});
