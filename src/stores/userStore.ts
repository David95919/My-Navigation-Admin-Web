import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = ref<User>({
      id: 0,
      username: '',
      password: ''
    })

    const token: Ref<string> = ref('')

    const cleanToken = () => {
      token.value = ''
    }

    return { user, token, cleanToken }
  },
  {
    persist: {
      paths: ['user', 'token']
    }
  }
)
