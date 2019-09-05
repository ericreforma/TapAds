import io from 'socket.io-client';
import { WEBSOCKET } from '../config/variables';

let socket;
const EVENTS = WEBSOCKET.EVENTS;

export const Socket = {
    connect: () => {
        socket = io(`${WEBSOCKET.WEBSOCKET_API}/${WEBSOCKET.CONNECT.MESSAGE()}`, WEBSOCKET.WEBSOCKET_PARAM);
        return socket;
    },
    onConnect: (websocket, callback) => {
        websocket.on(EVENTS.ON_CONNECT, () => callback());
    },
    getOnlineUsers: (websocket, callback) => {
        websocket.on(EVENTS.ONLINE_USERS, data => callback(data));
    },
    newOnlineClient: (websocket, callback) => {
        websocket.on(EVENTS.ONLINE_CLIENT, data => callback(data));
    },
    newMessage: (websocket, callback) => {
        websocket.on(EVENTS.NEW_MESSAGE, data => callback(data));
    },
    disconnectedUser: (websocket, callback) => {
        websocket.on(EVENTS.DC_USER, data => callback(data));
    },
    onConnectError: (websocket, callback) => {
        websocket.on(EVENTS.ERROR_CONN, () => callback());
    },
    stop: (websocket) => {
        websocket.disconnect();
        websocket.removeAllListeners();
		console.log('Websocket disconnected');
    }
};