import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const name = ref('')
    const errorMessage = ref('')
    const isLoading = ref(false)

    function validateName() {
        if (name.value.trim() === '') {
            errorMessage.value = `Ім'я не може бути порожнім`
            return false
        }
        errorMessage.value = ''
        return true
    }

    async function start(router) {
        if (!validateName()) {
            return
        }

        isLoading.value = true

        try {
            // Эмуляция запроса на сервер
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    // Условный ответ сервера
                    resolve({ success: true })
                }, 2000)
            })

            isLoading.value = false

            if (response.success) {
                router.push('/success-page')
            } else {
                router.push('/error-page')
            }
        } catch (error) {
            isLoading.value = false
            errorMessage.value = 'Произошла ошибка при отправке запроса'
        }
    }

    return { name, errorMessage, isLoading, start }
})
