<template>
  <div class="chat-room">
    <h2>Кімната</h2>
    <div class="messages">
      <div v-for="message in userStore.messages" :key="message.id" class="message" :class="{ 'my-message': message.user.uuid === userStore.user.uuid, 'other-message': message.user.uuid !== userStore.user.uuid }">
        <strong>{{ message.user.name }}:</strong> {{ message.message }}
      </div>
    </div>
    <div class="input-container">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Введіть повідомлення" />
      <button @click="sendMessage">Відправити</button>
      <button @click="handleExitChat">Вийти</button>
    </div>

    <div v-if="userStore.showExitMessage" class="exit-message">
      <p>Співрозмовник закінчив діалог</p>
      <button @click="redirectToHome">OK</button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useUserStore} from './../stores/userStore.js';
import {useRouter} from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const newMessage = ref('');

function sendMessage() {
  if (newMessage.value.trim() !== '') {
    userStore.sendMessage(newMessage.value);
    newMessage.value = '';
  }
}

function handleExitChat() {
  userStore.exitChat(router);
}

function redirectToHome() {
  router.push('/');
  userStore.isLoading = false;
  userStore.isQueue = false;
  userStore.showExitMessage = false;
  userStore.messages = [];
}

onMounted(() => {
  userStore.socket?.on('exit', () => {
    userStore.showExitMessage = true;
  });
});
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.chat-room {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f0f0f0;
}

h2 {
  text-align: center;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.message {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 12px;
  max-width: 70%;
  word-wrap: break-word;
}

.my-message {
  background-color: #dcf8c6;
  align-self: flex-start;
  text-align: left;
}

.other-message {
  background-color: #fff;
  border: 1px solid #ccc;
  align-self: flex-end;
  text-align: right;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.exit-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}
</style>
