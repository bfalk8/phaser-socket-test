export default class SocketHandler {
  constructor() {
    let HOST = location.origin.replace(/^http/, 'ws')
    this.ws = new WebSocket(HOST);
    console.log(HOST);
    this.ws.onopen = this.handleOpen.bind(this);
    this.ws.onmessage = this.handleMessage.bind(this);
  }

  handleOpen() {
    console.log(`Connected to WebSocket at ${this.ws.url}`);
  }

  handleMessage(event) {
    console.log(event);
  }
}
