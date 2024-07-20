import { defineStore } from 'pinia'
import { ref } from 'vue'

export const settingsStore = defineStore(
  'settingsStore',
  () => {
    const isGlass = ref(false)
    const background = ref('')
    const blurLevel = ref(10)

    return { isGlass, background, blurLevel }
  },
  {
    persist: {
      paths: ['isGlass', 'background', 'blurLevel']
    }
  }
)
