import { login, get, deleteById, create, getById, update } from '@/api/UserApi'
import { confirmDeletion, success } from '@/utils/Message'
import type { User, UserLogin, UserVO } from '@/types/User'
import type { Result } from '@/types/Result'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

//用户登录服务
export async function userLogin(myUser: User, keep: boolean): Promise<boolean> {
  const { token, temp_token, user } = storeToRefs(useUserStore())

  user.value.id = 0
  user.value.username = ''

  const result: Result<UserLogin> = await login(myUser)

  //登录失败
  if (result.code === 0) return false

  success(result.msg)

  if (keep) {
    token.value = result.data.token
  } else {
    temp_token.value = result.data.token
  }

  user.value.id = result.data.id
  user.value.username = result.data.username

  return true
}

//获取用户服务
export async function getUser(): Promise<UserVO[]> {
  const result: Result<UserVO[]> = await get()

  if (result.code === 0) return []

  return result.data
}

export async function deleteUserById(id: number) {
  const isConfirm = await confirmDeletion()
  if (isConfirm) {
    const result = await deleteById(id)

    if (result.code === 1) success(result.msg)
  }
}

export async function createUser(user: User) {
  const result = await create(user)

  if (result.code === 1) success(result.msg)

  return result.code !== 0
}

export async function getUserById(id: number) {
  const result = await getById(id)

  return result.data
}

export async function updateUser(user: User) {
  const result = await update(user)

  if (result.code === 1) success(result.msg)

  return result.code !== 0
}
