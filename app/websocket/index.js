import io from 'socket.io-client';
import { WEBSOCKET } from '../config/variables';

let socket;
const { EVENTS } = WEBSOCKET;

export const Socket = {
    connect: () => {
        socket = io(WEBSOCKET.CONNECT.MESSAGE);
        return socket;
    },
    onConnect: (websocket, callback) => {
        websocket.on(EVENTS.ON_CONNECT, () => callback());
    },
    getOnlineUsers: (websocket, callback) => {
        websocket.on(EVENTS.ONLINE_USERS, data => callback(data));
    },
    newOnlineUser: (websocket, callback) => {
        websocket.on(EVENTS.ONLINE_USER, data => callback(data));
    },
    newMessage: (websocket, callback) => {
        websocket.on(EVENTS.NEW_MESSAGE, data => callback(data));
    },
    disconnectedUser: (websocket, callback) => {
        websocket.on(EVENTS.DC_USER, data => callback(data));
    }
};