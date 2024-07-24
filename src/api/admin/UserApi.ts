import axios from '@/config/axios_admin'
import type { User, UserLogin, UserVO } from '@/types/User'
import type { Result } from '@/types/Result'

export async function login(user: User) {
  return (
    await axios.get<Result<UserLogin>>('/user/login', {
      params: {
        username: user.username,
        password: user.password
      }
    })
  ).data
}

export async function get() {
  return (await axios.get<Result<UserVO[]>>('/user')).data
}

export async function deleteById(id: number) {
  return (await axios.delete<Result<void>>(`/user/${id}`)).data
}

export async function create(user: User) {
  return (
    await axios.post<Result<void>>('/user', { username: user.username, password: user.password })
  ).data
}

export async function getById(id: number) {
  return (await axios.get<Result<User>>(`/user/${id}`)).data
}

export async function update(user: User) {
  return (await axios.put<Result<void>>('/user', user)).data
}
