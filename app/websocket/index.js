import io from 'socket.io-client';
import { SOCKET } from '../config/variables';

export const Socket = {
  login: () => {
    return io.connect(SOCKET.URL.login());
  },
  sendMessage: () => {
    return io.connect(SOCKET.URL.sendMessage());
  },
  newMessage: (callback) => {
    const socket = io.connect(SOCKET.URL.newMessage());
    socket.on('user new message', callback);
  },
  logout: () => {
    return io.connect(SOCKET.URL.logout());
  }
};