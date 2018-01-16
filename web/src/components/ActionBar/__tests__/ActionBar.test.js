import React from "react";
import { shallow } from "enzyme";

import { ActionBar, Action } from "../ActionBar";

import XWingSymbols from "../../Util/XWingSymbols";

describe("ActionBar", () => {
  let actions = [];

  describe("when given two actions", () => {
    beforeEach(() => {
      actions = ["Focus", "Target Lock"];
    });
    it("instantiates two actions", () => {
      const wrapper = shallow(<ActionBar actions={actions} />);

      expect(wrapper).toMatchElement(
        <div className="action-bar">
          <Action action={XWingSymbols.Focus} />
          <Action action={XWingSymbols.Targetlock} />
        </div>
      );
    });
  });
});
