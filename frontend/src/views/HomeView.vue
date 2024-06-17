<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const userStore = useUserStore()
const router = useRouter()

const start = () => userStore.start(router)
</script>

<template>
  <div>
    <LoadingSpinner  v-if="userStore.isLoading"></LoadingSpinner >
    <div v-else>
      <input v-model="userStore.name" type="text" placeholder="Ваше ім'я" />
      <div v-if="userStore.errorMessage">{{ userStore.errorMessage }}</div>
      <button @click="start">Розпочати бесіду</button>
    </div>
  </div>
</template>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #3a9d72;
}

div {
  margin-bottom: 10px;
  color: red;
}
</style>
