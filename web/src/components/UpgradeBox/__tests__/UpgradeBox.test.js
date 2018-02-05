import React from "react";
import { shallow } from "enzyme";

import { UpgradeBox } from "../UpgradeBox";
import { UpgradeBar } from "../UpgradeBar";
import { UpgradeList } from "../UpgradeList";

describe("UpgradeBox", () => {
  let slots = [];
  let upgrades = [];

  describe("when given no slots or upgrades", () => {
    beforeEach(() => {
      slots = [];
      upgrades = [];
    });
    it("creates a box with no equipped upgrades and the minimum slots", () => {
      const wrapper = shallow(<UpgradeBox slots={slots} upgrades={upgrades} />);

      expect(wrapper).toMatchElement(
        <div className="upgradebox">
          <UpgradeBar unused={["modification", "title"]} />
        </div>
      );

      const upgradeBar = wrapper.find("UpgradeBar");
      expect(upgradeBar).toHaveProp("unused", ["modification", "title"]);
    });
  });

  describe("when given some slots", () => {
    beforeEach(() => {
      slots = ["astromech", "elite"];
    });

    describe("when given no upgrades", () => {
      beforeEach(() => {
        upgrades = [];
      });

      it("creates a box with no equipped upgrades and the provided slots", () => {
        const wrapper = shallow(
          <UpgradeBox slots={slots} upgrades={upgrades} />
        );

        expect(wrapper).toMatchElement(
          <div className="upgradebox">
            <UpgradeBar
              unused={["astromech", "elite", "modification", "title"]}
            />
          </div>
        );

        const upgradeBar = wrapper.find("UpgradeBar");
        expect(upgradeBar).toHaveProp("unused", [
          "astromech",
          "elite",
          "modification",
          "title"
        ]);
      });
    });

    describe("when given some upgrades", () => {
      beforeEach(() => {
        upgrades = [
          ["astromech", { name: "some-r2-unit" }],
          ["modification", { name: "some modification" }]
        ];
      });
      it("creates a box with the equipped upgrades and uniequipped slots", () => {
        const wrapper = shallow(
          <UpgradeBox slots={slots} upgrades={upgrades} />
        );

        expect(wrapper).toMatchElement(
          <div className="upgradebox">
            <UpgradeList upgrades={upgrades} />
            <UpgradeBar unused={["elite", "title"]} />
          </div>
        );

        const upgradeBar = wrapper.find("UpgradeBar");
        expect(upgradeBar).toHaveProp("unused", ["elite", "title"]);

        const upgradeList = wrapper.find("UpgradeList");
        expect(upgradeList).toHaveProp("upgrades", [
          ["astromech", { name: "some-r2-unit" }],
          ["modification", { name: "some modification" }]
        ]);
      });
    });
  });
});
