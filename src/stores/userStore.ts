import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import type { Address } from '@/types/Other'

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
      return token.value.length >= 1 || temp_token.value.length >= 1
    }

    const address = ref<Address>({ city: '', area: '' })
    const weatherId = ref('')

    return { user, token, signOut, temp_token, isLogin, address, weatherId }
  },
  {
    persist: {
      paths: ['user', 'token', 'address', 'weatherId']
    }
  }
)
