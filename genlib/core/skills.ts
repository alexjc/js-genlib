// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

import { SkillInput, SkillOutput } from "./schema";

class BaseSkill {
  static inputs = [];
  static outputs = [];

  get_inputs() {
    return (<typeof BaseSkill>this.constructor).inputs;
  }

  get_outputs() {
    return (<typeof BaseSkill>this.constructor).outputs;
  }
}

export { SkillOutput as Output, SkillInput as Input, BaseSkill as Skill };
