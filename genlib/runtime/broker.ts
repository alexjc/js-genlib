// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

class Publisher {
  function: CallableFunction;
  args: any[];

  constructor(func, args) {
    this.function = func;
    this.args = args;
  }
}

abstract class Subscription {
  abstract cancel();
  abstract async process(message);
}

class QueueSubscription {
  channel: Channel;
  queue: any[];

  constructor(channel: Channel) {
    this.channel = channel;
    this.queue = [];
  }

  async process(message) {
    this.queue.push(message);
  }

  async get() {
    if (this.queue.length === 0) {
      await this.channel.provide();
    }
    return this.queue.shift();
  }

  cancel() {
    // this.queue.push(null);
  }
}

/*
  async def get(self):
      if self._queue.qsize() == 0:
          await self.channel.provide()
      return await self._queue.get()
*/

class Channel {
  key: string;
  publisher: Publisher | null;
  subscriptions: Subscription[];

  constructor(key: string) {
    this.key = key;
    this.publisher = null;
    this.subscriptions = [];
  }

  async provide() {
    if (this.publisher != null) {
      await this.publisher.function(this.publisher.args);
    }
  }

  close() {
    for (const sub of this.subscriptions) {
      sub.cancel();
    }
  }
}

class Broker {
  channels: { [key: string]: Channel };

  constructor() {
    this.channels = {};
  }

  create_channel(key) {
    if (key in this.channels) {
      throw new Error("Channel was already created.");
    }
    this.channels[key] = new Channel(key);
  }

  destroy_channel(key) {
    const channel = this.get_channel(key);
    channel.close();

    delete this.channels[key];
  }

  get_channel(key) {
    if (!(key in this.channels)) {
      throw new Error("Channel does not exist.");
    }
    return this.channels[key];
  }

  subscribe(key): Subscription {
    const channel = this.get_channel(key);
    const sub = new QueueSubscription(channel);
    channel.subscriptions.push(sub);
    return sub;
  }

  unsubscribe(key, subscription: Subscription) {
    const channel = this.get_channel(key);
    channel.subscriptions = channel.subscriptions.filter(
      sub => sub !== subscription
    );
  }

  get_subscription_count(channel_key) {
    const channel = this.get_channel(channel_key);
    return channel.subscriptions.length;
  }

  register_publisher(channel_key, callback, ...args: any[]) {
    const channel = this.get_channel(channel_key);
    channel.publisher = new Publisher(callback, args);
  }

  async publish(channel_key: string, message: any) {
    const channel = this.get_channel(channel_key);
    for (const sub of channel.subscriptions) {
      await sub.process(message);
    }
  }

  async receive(channel_key, subscription = null) {
    const sub = subscription || this.subscribe(channel_key);
    const result = await sub.get();
    const _ = subscription || this.unsubscribe(channel_key, sub);
    return result;
  }
}

export { Broker };
