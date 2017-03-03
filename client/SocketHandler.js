export default class SocketHandler {
  constructor() {
    let HOST = location.origin.replace(/^http/, 'ws')
    this.ws = new WebSocket(HOST);
    console.log(HOST);
    this.listeners = {};
    this.ws.onopen = this.handleOpen.bind(this);
    this.ws.onmessage = this.handleMessage.bind(this);
  }

  handleOpen() {
    console.log(`Connected to WebSocket at ${this.ws.url}`);
  }

  handleMessage(event) {
    let message = JSON.parse(event.data);
    if(this.listeners.hasOwnProperty(message.type))
      this.listeners[message.type](message.payload);
  }

  on(type, func) {
    this.listeners[type] = func;
  }

  removeListener(type, func) {
    delete this.listeners[type];
  }

  send(type, payload) {
    this.ws.send(JSON.stringify({type: type, payload: payload}));
  }
}
