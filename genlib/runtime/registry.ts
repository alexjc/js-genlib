// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

import { SkillSchema } from "../core/schema";

/**
 * Loads and stores skills from file-system, indexing them by URI.
 */
class Registry {
  schemas: any;
  classes: any;

  constructor() {
    this.schemas = {};
    this.classes = {};
  }

  construct(schema) {
    return new this.classes[schema.uri]();
  }

  find_skill_schema(uri) {
    return this.schemas[uri];
  }

  list_skills_schema() {
    return Object.keys(this.schemas);
  }

  register_class(uri, obj) {
    const scm = new SkillSchema(uri, obj.inputs, obj.outputs);
    this.schemas[uri] = scm;
    this.classes[uri] = obj;
    return scm;
  }
}

export { Registry };
