import { HttpRequest } from '../services/http';

export const ChatController = {
  request: {
    sendMessage: (args = {}) => HttpRequest.post('/user/message/save', args)
  }
};