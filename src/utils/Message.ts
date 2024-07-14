import {ElMessage, ElMessageBox, type MessageOptions} from 'element-plus';
import i18n from "@/locales";

const {t} = i18n.global


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

export async function confirmDeletion() {
    try {
        await ElMessageBox.confirm(t('other.confirm_delete'), t('other.warning'), {
            confirmButtonText: t('other.confirm'),
            cancelButtonText: t('other.cancel'),
            draggable: true,
        });
        return true;
    } catch {
        return false;
    }
}

