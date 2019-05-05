// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

class SkillOutput {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class SkillInput {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class SkillSchema {
  uri: string;
  inputs: SkillInput[];
  outputs: SkillOutput[];

  constructor(uri, inputs, outputs) {
    this.uri = uri;
    this.inputs = inputs;
    this.outputs = outputs;
  }
}

export { SkillInput, SkillOutput, SkillSchema };
