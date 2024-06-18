import chatService from "../service/chatService.js";
import { v4 as uuidv4 } from 'uuid';

class ChatController {
    async addQueue(req, res, next) {
        try {
            console.log(req.body);

            if (!req.body.uuid) {
                const user = { uuid: uuidv4(), ...req.body };
                const socket = req.app.get('io').sockets.sockets.get(req.body.socketId);

                if (socket) {
                    const { success, msg, user: updatedUser } = chatService.addQueue(user, socket);
                    res.json({ success, msg, user: updatedUser });
                } else {
                    res.json({ success: false, msg: 'Socket not found' });
                }
            } else {
                console.log('User already in queue');
                res.json({ success: false, msg: 'User already in queue' });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async leaveQueue(req, res, next) {
        try {
            const { uuid } = req.body;
            if (uuid) {
                const { success, msg } = chatService.leaveQueue({ uuid });
                res.json({ success, msg });
            } else {
                res.json({ success: false, msg: 'User not in queue' });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new ChatController();
