import { defineStore } from 'pinia'
import { ref } from 'vue'

export const settingsStore = defineStore(
  'settingsStore',
  () => {
    const isGlass = ref(false)

    return { isGlass }
  },
  {
    persist: {
      paths: ['isGlass']
    }
  }
)
