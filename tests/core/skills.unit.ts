// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

import { BaseSkill } from "../../genlib/core/skills";

describe("base skill", () => {
  it("builds", () => {
    expect(new BaseSkill()).toBeTruthy();
  });

  it("has no outputs", () => {
    var skill = new BaseSkill();
    expect(skill.get_outputs().length).toBe(0);
  });

  it("has no inputs", () => {
    var skill = new BaseSkill();
    expect(skill.get_inputs().length).toBe(0);
  });
});
