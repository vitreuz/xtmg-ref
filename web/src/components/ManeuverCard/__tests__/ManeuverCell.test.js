import React from "react";
import { shallow } from "enzyme";
import "jest-enzyme";
import { ManeuverCell } from "../ManeuverCard";

describe("ManeuverCell", () => {
  let bearing;
  let difficulty;

  beforeEach(() => {
    bearing = "straight";
  });

  describe("when no difficulty is provided", () => {
    beforeEach(() => {
      difficulty = null;
    });

    it("should render an empty-square td", () => {
      const wrapper = shallow(
        <ManeuverCell bearing={bearing} difficulty={difficulty} />
      );

      expect(wrapper).toMatchElement(<td className="empty-maneuver-cell" />);
    });
  });

  describe("when a difficulty is provided", () => {
    beforeEach(() => {
      difficulty = "white";
    });

    it("renders the corresponding difficulty and bearing", () => {
      const wrapper = shallow(
        <ManeuverCell bearing={bearing} difficulty={difficulty} />
      );

      expect(wrapper).toMatchElement(
        <td className="white-maneuver-cell">
          <i className="xwing-miniatures-font-straight" />
        </td>
      );
    });
  });
});
