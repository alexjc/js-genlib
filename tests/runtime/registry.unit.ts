// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

import { Registry } from "../../genlib/runtime/registry";

class FakeSkill {
  static inputs = ["abcd"];
  static outputs = ["efgh"];
}

describe("registry", () => {
  it("builds", () => {
    expect(new Registry()).toBeTruthy();
  });

  it("can register a skill implementation", () => {
    const registry = new Registry();
    expect(registry.list_skills_schema().length).toBe(0);
    registry.register_class("file.py#Anchor", FakeSkill);
    expect(registry.list_skills_schema().length).toBe(1);
  });

  it("can find a skill with valid attributes by uri", () => {
    const registry = new Registry();
    registry.register_class("file.py#Anchor", FakeSkill);
    const schema = registry.find_skill_schema("file.py#Anchor");
    expect(schema.uri).toEqual("file.py#Anchor");
    expect(schema.inputs).toEqual(["abcd"]);
    expect(schema.outputs).toEqual(["efgh"]);
  });

  it("constructs a skill from a schema", () => {
    const registry = new Registry();
    const schema = registry.register_class("file.py#Anchor", FakeSkill);
    const skill = registry.construct(schema);
    expect(skill).toBeInstanceOf(FakeSkill);
  });
});
