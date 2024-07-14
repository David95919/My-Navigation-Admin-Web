import {warning} from "@/utils/Message";

export default {
    error: {
        not_login: 'not signed in'
    },
    login: {
        login: 'Login',
        keep: 'Keep',
        rules: {
            required_username: 'Please enter a username',
            required_password: 'Please enter a password',
            length: 'Length should be 6 to 24',
        }
    },
    manage: {
        home: 'Home',
        navigation: 'Navigation',
        category: 'Category',
        tag: 'Tag',
        user: 'User'
    },
    other: {
        name: 'Name',
        search: 'Search',
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        cancel: 'Cancel',
        confirm: 'Confirm',
        confirm_delete: 'Confirm delete?',
        warning: 'warning'
    },
    user: {
        username: 'Username',
        password: 'Password',
    },
}
