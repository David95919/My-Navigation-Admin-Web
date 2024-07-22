import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import zh from './zh' // 中文语言包
import en from './en'

// 实例化I18n
const i18n = createI18n({
  locale: localStorage.getItem('language') || 'zh',
  messages: {
    zh,
    en
  }
})

export default i18n
