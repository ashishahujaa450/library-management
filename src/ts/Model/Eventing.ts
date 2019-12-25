type Callback = () => void;

export class Eventing {
  private events: { [key: string]: Callback[] } = {};

  //registering events
  public on = (eventName: string, callback: Callback): void => {
    const handler = this.events[eventName] || [];
    handler.push(callback);
    this.events[eventName] = handler;
  };

  //triggering evens
  public trigger = (eventName: string): void => {
    const handler = this.events[eventName];

    if (handler) {
      handler.forEach((callback: Callback) => {
        callback();
      });
    } else {
      throw new Error("event not found");
    }
  };
}
