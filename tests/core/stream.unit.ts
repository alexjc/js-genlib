// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

import { Item } from "../../genlib/core/stream";

describe("item", () => {
  it("builds", () => {
    expect(new Item("abcd", String)).toBeTruthy();
  });

  it("assigns a unique identifier to the item", () => {
    const item = new Item("efgh", String);
    expect(item.uuid).toBeTruthy();
  });

  it("assigns unique identifiers to each item", () => {
    const i1 = new Item("abcd", String);
    const i2 = new Item("efgh", String);
    expect(i1.uuid).not.toEqual(i2.uuid);
  });
});
