import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { io } from 'socket.io-client';

export const useUserStore = defineStore('user', () => {
    const errorMessage = ref('');
    const isLoading = ref(false);
    const isQueue = ref(false);
    const user = ref({ name: '' });
    const roomId = ref('');
    const socket = ref(null);
    const messages = ref([]);
    const showExitMessage = ref(false);

    function validateName() {
        if (user.value.name.trim() === '') {
            errorMessage.value = `Ім'я не може бути порожнім`;
            return false;
        }
        errorMessage.value = '';
        return true;
    }

    async function start(router) {
        if (!validateName()) {
            return;
        }

        isLoading.value = true;

        try {
            socket.value = io('http://localhost:5000');

            socket.value.on('connect', async () => {
                const socketId = socket.value.id;

                const response = await axios.post('http://localhost:5000/start', {
                    name: user.value.name,
                    socketId,
                });

                if (response.data.success) {
                    isLoading.value = false;
                    isQueue.value = true;
                    user.value = response.data.user;
                } else {
                    isLoading.value = false;
                    errorMessage.value = 'Ви вже у черзі';
                }
            });

            socket.value.on('roomCreated', (data) => {
                roomId.value = data.roomId;
                user.value = data.users.find(u => u.uuid === user.value.uuid);
                console.log('Room created:', data);
                router.push('/room');
            });

            socket.value.on('message', (message) => {
                console.log(message);
                messages.value.push(message);
            });

            socket.value.on('exit', () => {
                showExitMessage.value = true;
            });

            socket.value.on('disconnect', () => {
                console.log('WebSocket отключен');
            });
        } catch (error) {
            isLoading.value = false;
            errorMessage.value = 'Похибка на сервері';
        }
    }

    function sendMessage(message) {
        if (socket.value && roomId.value) {
            socket.value.emit('message', { roomId: roomId.value, message, user: user.value });
        }
    }

    function exitChat(router) {
        if (socket.value && roomId.value) {
            socket.value.emit('exit', roomId.value);
            socket.value.disconnect();
            router.push('/');
            isLoading.value = false;
            isQueue.value = false;
            showExitMessage.value = false;
            messages.value = [];
        }
    }

    const computedUser = computed(() => user.value);

    return {
        user: computedUser,
        errorMessage,
        isLoading,
        isQueue,
        start,
        sendMessage,
        exitChat,
        messages,
        showExitMessage,
    };
});
