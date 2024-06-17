import chatService from "../service/chatService.js";
import { v4 as uuidv4 } from 'uuid';

class ChatController {
    async addQueue(req, res, next) {
        try {
            console.log(req.body)

            if (!req.body.uuid) {
                const user = { uuid: uuidv4(), ...req.body };
                const { success, msg } = chatService.addQueue(user);
                res.json({ success, msg, user });
            } else {
                console.log('Юзер есть')
                res.json({ success: false, msg: 'User already in queue' });
            }
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    async leaveQueue(req, res, next) {
        try {
            if (req.user) {
                const { success, msg } = chatService.leaveQueue(req.user);
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
