// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

import { SkillInput, SkillOutput, SkillSchema } from "../../genlib/core/schema";

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

describe("schema", () => {
  it("builds empty", () => {
    expect(new SkillSchema("file.py#Anchor", [], [])).toBeTruthy();
  });
});
