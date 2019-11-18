import io from 'socket.io-client';
import { SOCKET } from '../config/variables';

export const Socket = {
  connect: () => io.connect(SOCKET.connect())
};