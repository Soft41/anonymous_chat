<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const userStore = useUserStore();
const router = useRouter();

const start = () => userStore.start(router);
</script>

<template>
  <div class="centered-container">
    <LoadingSpinner v-if="userStore.isLoading"></LoadingSpinner>
    <div v-else>
      <input v-model="userStore.user.name" type="text" placeholder="Ваше ім'я" />
      <div v-if="userStore.errorMessage">{{ userStore.errorMessage }}</div>
      <button @click="start">Розпочати бесіду</button>
    </div>
    <LoadingSpinner v-if="userStore.isQueue"></LoadingSpinner>
  </div>
</template>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

input {
  display: block;
  width: 300px;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
}

button {
  width: 300px;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #3a9d72;
}

div {
  text-align: center;
}
</style>
