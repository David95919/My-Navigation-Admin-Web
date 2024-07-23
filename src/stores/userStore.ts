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
    const temp_token: Ref<string> = ref('')

    const signOut = () => {
      token.value = ''
      temp_token.value = ''
      window.location.replace('/')
    }

    const isLogin = () => {
      return token.value || temp_token.value
    }

    return { user, token, signOut, temp_token, isLogin }
  },
  {
    persist: {
      paths: ['user', 'token']
    }
  }
)
