import axios from "@/config/axios";
import type User from "@/entity/User";

export async function login(user: User): Promise<string> {
    const result = await axios.get('/user/login', {
        params: {
            username: user.username,
            password: user.password
        }
    });

    console.log(result)

    return ''
}
