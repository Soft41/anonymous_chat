import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
    const errorMessage = ref('');
    const isLoading = ref(false);
    const user = ref({ name: '' });

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

        console.log(user.value)

        try {
            const response = await axios.post('http://localhost:5000/start', user.value);

            if (response.data.success) {
                isLoading.value = false;
                user.value = response.data.user;
            } else {
                isLoading.value = false;
                errorMessage.value = 'Ви вже у черзі';
            }
        } catch (error) {
            isLoading.value = false;
            errorMessage.value = 'Похибка на сервері';
        }
    }

    const computedUser = computed(() => user.value);

    return {
        name,
        errorMessage,
        isLoading,
        start,
        user: computedUser
    };
});
