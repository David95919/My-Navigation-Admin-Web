import {login, get} from "@/api/UserApi";
import {success} from "@/utils/Message"
import type {User, UserLogin, UserVO} from "@/types/User";
import type {Result} from "@/types/Result";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/userStore";

//用户登录服务
export async function userLogin(user: User, keep: boolean): Promise<boolean> {
    const result: Result<UserLogin> = await login(user);

    //登录失败
    if (result.code === 0) return false

    success(result?.msg)
    if (keep) {
        const {token, user} = storeToRefs(useUserStore());
        token.value = result.data.token
        user.value.id = result.data.id
        user.value.username = result.data.username
    }

    return true
}

//获取用户服务
export async function getUser(): Promise<UserVO[]> {
    const result: Result<UserVO[]> = await get();

    if (result.code === 0) return []

    return result.data
}