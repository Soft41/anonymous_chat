<template>
  <div class="chat-room">
    <h2>Кімната</h2>
    <div class="messages">
      <div v-for="message in userStore.messages" :key="message.id" class="message">
        <strong>{{ message.user.name }}:</strong> {{ message.message }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Введите сообщение" />
    <button @click="sendMessage">Відправити</button>
    <button @click="sendMessage">Вийти</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from './../stores/userStore.js';

const userStore = useUserStore();
const newMessage = ref('');

const roomId = userStore.roomId;

function sendMessage() {
  if (newMessage.value.trim() !== '') {
    userStore.sendMessage(newMessage.value);
    newMessage.value = '';
  }
}
</script>

<style>
.chat-room {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.message {
  margin-bottom: 0.5rem;
}

input {
  width: calc(100% - 100px);
  padding: 0.5rem;
  margin-right: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}
</style>
