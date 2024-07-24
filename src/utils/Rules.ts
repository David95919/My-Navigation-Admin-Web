import type { FormRules } from 'element-plus'
import { reactive } from 'vue'
import i18n from '@/locales'

const { t } = i18n.global

export interface NavFormRuleImpl {
  name: string
  url: string
  category: number
}

export const NavFormRule = reactive<FormRules<NavFormRuleImpl>>({
  name: [
    { required: true, message: t('rules.commons.name.required'), trigger: 'blur' },
    { min: 3, max: 24, message: t('rules.nav.name.length'), trigger: 'blur' }
  ],
  url: [
    { required: true, message: t('rules.nav.url.required'), trigger: 'blur' },
    { pattern: /^(http|https):\/\/.*$/, message: t('rules.nav.url.is_url'), trigger: 'blur' },
    { min: 9, max: 120, message: t('rules.nav.url.length'), trigger: 'blur' }
  ],
  category: [{ required: true, message: t('rules.commons.select.required'), trigger: 'blur' }]
})

export interface CategoryFormRuleImpl {
  name: string
}

export const CategoryFormRule = reactive<FormRules<CategoryFormRuleImpl>>({
  name: [
    { required: true, message: t('rules.commons.name.required'), trigger: 'blur' },
    { min: 2, max: 24, message: t('rules.category.name.length'), trigger: 'blur' }
  ]
})

export interface TagFormRuleImpl {
  name: string
}

export const TagFormRule = reactive<FormRules<TagFormRuleImpl>>({
  name: [
    { required: true, message: t('rules.commons.name.required'), trigger: 'blur' },
    { min: 2, max: 24, message: t('rules.tag.name.length'), trigger: 'blur' }
  ]
})

export interface UserFormRuleImpl {
  username: string
  password: string
}

export const UserFormRule = reactive<FormRules<UserFormRuleImpl>>({
  username: [
    { required: true, message: t('rules.user.username.required'), trigger: 'blur' },
    { min: 6, max: 24, message: t('rules.user.username.length'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('rules.user.password.required'), trigger: 'blur' },
    { min: 6, max: 24, message: t('rules.user.password.length'), trigger: 'blur' }
  ]
})
