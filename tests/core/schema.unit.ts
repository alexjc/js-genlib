import { SkillInput, SkillOutput } from '../../genlib/core/schema';

describe("input", () => {
  it("builds", () => {
    expect(new SkillInput("input")).toBeTruthy();
  });
});

describe("output", () => {
  it("builds", () => {
    expect(new SkillOutput("output")).toBeTruthy();
  });
});
