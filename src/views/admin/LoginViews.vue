<script setup lang="ts">
import { ref } from 'vue'
import type { FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { User, Lock } from '@element-plus/icons-vue'
import { userLogin } from '@/service/admin/UserService'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const formRef = ref(null)
const form = ref({
  username: '',
  password: '',
  keep: true
})

interface RuleForm {
  username: string
  password: string
}

const rules = ref<FormRules<RuleForm>>({
  username: [
    { required: true, message: t('login.rules.required_username'), trigger: 'blur' },
    { min: 7, max: 24, message: t('login.rules.length'), trigger: 'change' }
  ],
  password: [
    { required: true, message: t('login.rules.required_password'), trigger: 'blur' },
    { min: 7, max: 24, message: t('login.rules.length'), trigger: 'change' }
  ]
})

const handleLogin = async () => {
  isLoading.value = true
  const isLogin = await userLogin(
    {
      id: 0,
      username: form.value.username,
      password: form.value.password
    },
    form.value.keep
  )
  isLoading.value = false

  if (isLogin) {
    if (route.query.redirect) {
      router.push({ name: route.query.redirect.toString() })
    } else {
      router.push({ path: '/' })
    }
  }
}
</script>
<template>
  <div class="main">
    <el-card class="central" v-loading="isLoading">
      <template #header>
        <span class="title">{{ $t(`login.login`) }}</span>
      </template>
      <el-form :model="form" :rules="rules" label-width="auto" ref="formRef">
        <el-form-item :label="$t(`user.username`)" prop="username">
          <el-input v-model="form.username" :prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`user.password`)" prop="password">
          <el-input
            v-model="form.password"
            :prefix-icon="Lock"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`login.keep`)">
          <el-switch v-model="form.keep"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" @click="handleLogin">{{ $t(`login.login`) }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style scoped lang="less">
.central {
  box-sizing: border-box;
  margin: 25vh auto;
  width: 40vw;
  padding: 1vw 5vw;

  .title {
    display: block;
    font-size: 36px;
    text-align: center;
  }

  .login-button {
    margin: 0 auto;
  }
}

.main {
  height: 100vh;
}
</style>
