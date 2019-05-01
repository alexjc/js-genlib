// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

import { provides, watching } from "../../genlib/core/meta";

/* tslint:disable:no-empty no-string-literal */

describe("provides", () => {
  it("creates a configuration on the object", () => {
    class Test {
      @provides("value") compute() {}
    }

    const test: any = new Test();
    expect(test._genlib).toBeTruthy();
    expect(test._genlib.method_provides).toBeTruthy();
  });

  it("stores the function based on its name", () => {
    class Test {
      @provides("result") process() {}
    }

    const test: any = new Test();
    expect(test._genlib.method_provides["result"]).toEqual(test.process);
  });

  it("works for multiple different functions", () => {
    class Test {
      @provides("first") first() {}
      @provides("second") second() {}
    }

    const test: any = new Test();
    expect(test._genlib.method_provides["first"]).toEqual(test.first);
    expect(test._genlib.method_provides["second"]).toEqual(test.second);
  });
});

describe("watching", () => {
  it("creates a configuration on the object", () => {
    class Test {
      @watching("value") compute() {}
    }

    const test: any = new Test();
    expect(test._genlib).toBeTruthy();
    expect(test._genlib.methods_watching).toBeTruthy();
  });

  it("stores the function based on its name", () => {
    class Test {
      @watching("result") process() {}
    }

    const test: any = new Test();
    expect(test._genlib.methods_watching["result"]).toEqual([test.process]);
  });

  it("works for the same function multiple times", () => {
    class Test {
      @watching("first") @watching("second") compute() {}
    }

    const test: any = new Test();
    expect(test._genlib.methods_watching["first"]).toEqual([test.compute]);
    expect(test._genlib.methods_watching["second"]).toEqual([test.compute]);
  });

  it("works for multiple different functions", () => {
    class Test {
      @watching("x") one() {}
      @watching("x") two() {}
    }

    const test: any = new Test();
    expect(test._genlib.methods_watching["x"]).toEqual([test.one, test.two]);
  });
});
