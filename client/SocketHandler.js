export default class SocketHandler {
  constructor(socketFunc) {
    let HOST = location.origin.replace(/^http/, 'ws')
    this.ws = new WebSocket(HOST);
    console.log(HOST);
    this.ws.onopen = this.handleOpen.bind(this);
    this.ws.onmessage = this.handleMessage.bind(this);
    this.socketFunc = socketFunc;
  }

  handleOpen() {
    console.log(`Connected to WebSocket at ${this.ws.url}`);
  }

  handleMessage(event) {
    this.socketFunc(JSON.parse(event.data));
  }

  sendMessage(event, payload) {
    this.ws.send(JSON.stringify({event: event, payload: payload}));
  }
}
