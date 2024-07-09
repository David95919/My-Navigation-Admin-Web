import {ElMessage, type MessageOptions} from 'element-plus';

function message(msg: string, type: 'success' | 'warning' | 'info' | 'error') {
    const options: MessageOptions = {
        message: msg,
        type: type,
        plain: true,
        showClose: true,
    };

    ElMessage(options);
}


export function success(msg: string) {
    message(msg, 'success')
}

export function warning(msg: string) {
    message(msg, 'warning')
}

export function error(msg: string) {
    message(msg, 'error')
}

export function info(msg: string) {
    message(msg, 'info')
}
