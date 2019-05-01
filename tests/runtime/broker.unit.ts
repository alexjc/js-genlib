// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

import { Broker } from "../../genlib/runtime/broker";

describe("broker channels", () => {
  it("builds", () => {
    expect(new Broker()).toBeTruthy();
  });

  it("creates and destroys a channel", () => {
    const broker = new Broker();
    broker.create_channel("abcd");
    broker.destroy_channel("abcd");
  });

  it("fails to create an existing channel", () => {
    const broker = new Broker();
    broker.create_channel("abcd");
    expect(() => {
      broker.create_channel("abcd");
    }).toThrow();
  });

  it("fails to destroy a non-existant channel", () => {
    const broker = new Broker();
    expect(() => {
      broker.destroy_channel("abcd");
    }).toThrow();
  });
});

describe("broker pubsub", () => {
  it("subscribes correctly", () => {
    const broker = new Broker();
    broker.create_channel("abcd");

    expect(broker.subscribe("abcd")).toBeTruthy();
    expect(broker.get_subscription_count("abcd")).toBe(1);
  });

  it("unsubscribes correctly", () => {
    const broker = new Broker();
    broker.create_channel("abcd");

    const sub = broker.subscribe("abcd");
    broker.unsubscribe("abcd", sub);
    expect(broker.get_subscription_count("abcd")).toBe(0);
  });

  it("unsubscribes when channel destroyed", () => {
    const broker = new Broker();
    broker.create_channel("abcd");

    broker.subscribe("abcd");
    broker.destroy_channel("abcd");
  });

  it("publishes and receives a message", async () => {
    const broker = new Broker();
    broker.create_channel("abcd");

    const sub = broker.subscribe("abcd");
    await broker.publish("abcd", 1234);
    expect(await broker.receive("abcd", sub)).toEqual(1234);
  });
});

describe("broker provides", () => {
  it("calls provider when queue is empty", async () => {
    const broker = new Broker();
    broker.create_channel("abcd");
    broker.register_publisher("abcd", () => {
      broker.publish("abcd", 1234);
    });
    expect(await broker.receive("abcd")).toEqual(1234);
  });
});
