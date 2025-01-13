import axios from '../setup/axios'

const findUserByUsername = async (username) => {
    return await axios.get(`/access/get-user-by-username?username=${username}`)
}

const logIn = async (data) => {
    return await axios.post('/access/signin', data)
}

const RegisterUser = async (data) => {
    return await axios.post('/access/signup', data)
}

const ConfirmRegisterUser = async (data) => {
    return await axios.post('/access/signup/confirm', data)
}

const ConfirmUserFromForgotPassword = async (data) => {
    return await axios.post('/access/forgot-password/confirm-user', data)
}

const ConfirmAccessFromForgotPassword = async (data) => {
    return await axios.post('/access/forgot-password/confirm-access-number', data)
}

const ChangePassword = async (data) => {
    return await axios.post('/access/forgot-password/change-password', data)
}

const checkToken = async (accessToken) => {
    return await axios.get(`/access/check-token?accessToken=${accessToken}`)
}
const getListUserSearchByUsername = async (username) => {
    return await axios.get(`/access/search-user-by-username?username=${username}`)
}

const getFolderPublic = async (folderId) => {
    return await axios.get(`/access/public?folderId=${folderId}`)
}

export {
    findUserByUsername, logIn, RegisterUser,
    ConfirmRegisterUser, ConfirmUserFromForgotPassword,
    ConfirmAccessFromForgotPassword, ChangePassword,
    checkToken, getListUserSearchByUsername, getFolderPublic
}