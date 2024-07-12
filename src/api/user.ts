import axios from "@/config/axios";
import type {User, UserLogin, UserVO} from "@/types/User";
import type {Result} from "@/types/Result";

export async function login(user: User): Promise<Result<UserLogin>> {
    return (await axios.get<Result<UserLogin>>('/user/login', {
        params: {
            username: user.username,
            password: user.password
        }
    })).data
}

export async function get():Promise<Result<UserVO[]>> {
    return (await axios.get<Result<UserVO[]>>('/user')).data
}
