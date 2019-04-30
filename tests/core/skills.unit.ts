import { Skill } from '../../genlib/core/skills';

describe("custom skill", () => {
  it("builds", () => {
    expect(new Skill()).toBeTruthy();
  });
});
