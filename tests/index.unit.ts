// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

import { Skill, Input, Output } from "../genlib";

describe("custom skill", () => {
  it("can define an output", () => {
    class FakeSkill extends Skill {
      static outputs: Output[] = [new Output("efgh")];
    }
    var skill = new FakeSkill();
    expect(skill.get_outputs().length).toBe(1);
  });

  it("can define an input", () => {
    class FakeSkill extends Skill {
      static inputs: Input[] = [new Input("efgh")];
    }
    var skill = new FakeSkill();
    expect(skill.get_inputs().length).toBe(1);
  });
});
