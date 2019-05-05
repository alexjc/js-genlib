// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

import { v1 as uuidv1 } from "uuid";

class Item {
  uuid: string;
  data: any;
  type: string;

  constructor(data, type) {
    this.uuid = uuidv1();
    this.data = data;
    this.type = type;
  }
}

export { Item };
