import Queue from "../src/chatQueue.js";

class ChatService {
    addQueue(user) {
        Queue.push(user);
        return {
            success: true,
            msg: 'OK'
        };
    }

    leaveQueue(user) {
        const index = Queue.findIndex(obj => obj.uuid === user.uuid);
        if (index !== -1) {
            Queue.splice(index, 1);
            return {
                success: true,
                msg: 'OK'
            };
        }
        return {
            success: false,
            msg: 'User not in queue'
        };
    }
}

export default new ChatService();
