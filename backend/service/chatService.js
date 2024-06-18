import {Queue, Chats} from "../src/chatQueue.js";
import { v4 as uuidv4 } from 'uuid';

const socketMap = new Map();

class ChatService {
    addQueue(user, socket) {
        Queue.push(user);
        socketMap.set(user.uuid, socket); // Сохраняем WebSocket соединение

        if (Queue.length >= 2) {
            const [user1, user2] = Queue.splice(0, 2);
            const roomId = uuidv4();
            Chats.push({
                roomId,
                users: [user1, user2]
            });

            const socket1 = socketMap.get(user1.uuid);
            const socket2 = socketMap.get(user2.uuid);

            if (socket1) {
                socket1.join(roomId);
                socket1.emit('roomCreated', { roomId, users: [user1, user2] });
            }
            if (socket2) {
                socket2.join(roomId);
                socket2.emit('roomCreated', { roomId, users: [user1, user2] });
            }
        }

        return {
            success: true,
            msg: 'User added to queue',
            user
        };
    }

    leaveQueue(user) {
        const index = Queue.findIndex(obj => obj.uuid === user.uuid);
        if (index !== -1) {
            Queue.splice(index, 1);
            socketMap.delete(user.uuid);
            return {
                success: true,
                msg: 'User removed from queue'
            };
        }
        return {
            success: false,
            msg: 'User not in queue'
        };
    }

    getUserSocket(uuid) {
        return socketMap.get(uuid);
    }
}

export default new ChatService();
