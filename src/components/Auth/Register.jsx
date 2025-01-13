import { useSelector } from 'react-redux'
import { RegisterUser, ConfirmRegisterUser } from '../../service/accessService'
import './Login.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isConfirm, setIsConfirm] = useState(false)
    const [accessNumber, setAccessNumber] = useState('')
    const [isOnHidePassword, setIsOnHidePassword] = useState(false)
    const navigate = useNavigate()
    const [messageError, setMessageError] = useState('')
    const [messageErrorConfirm, setMessageErrorConfirm] = useState('')
    const accessToken = useSelector((state) => state.auth.accessToken);

    const HandleOnClickRegister = async () => {
        const response = await RegisterUser({ username: username, password: password, email: email })

        if (response.statusCode === 200) {
            setIsConfirm(true)
        } else {
            setMessageError(response.message)
        }
    }

    useEffect(() => {
        if (accessToken) {
            navigate('/')
        }
    }, [accessToken])


    const HandleOnClickRegisterConfirm = async () => {
        const response = await ConfirmRegisterUser({ username, password, email, accessNumber })
        if (response.statusCode === 201) {
            navigate('/login')
        } else {
            setMessageErrorConfirm(response.message)
        }
    }

    return (
        <>
            <div className='login-container flex justify-center py-12 items-center  h-[100vh] bg-[#f0f4f9]'>
                <div className='w-[1040px]'>
                    <div className='bg-white p-9 min-h-[384px] rounded-[30px]'>
                        <div>
                            <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 40 48" aria-hidden="true" jsname="jjf7Ff"><path fill="#4285F4" d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"></path><path fill="#34A853" d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"></path><path fill="#FABB05" d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"></path><path fill="#E94235" d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"></path></svg>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className={'w-[50%] text-[#1F1F1F] '}>
                                <div className='text-[44px]  mt-[24px]'>
                                    Đăng ký
                                </div>
                                <div className='mt-[16px]'>
                                    Nhập thông tin của bạn
                                </div>
                            </div>


                            <div className={isConfirm ? 'hidden' : ''}>
                                <div className='login-input-main'>
                                    <input type="text" className={messageError ? 'login-input  input-error' : 'login-input'} value={username} onChange={(e) => { setUsername(e.target.value); setMessageError('') }} />
                                    <div className={username ? 'title-input hidden' : 'title-input'}>Tên đăng nhập</div>
                                </div>
                                <div className='login-input-main mt-2'>
                                    <input type="text" className={messageError ? 'login-input  input-error' : 'login-input'} value={email} onChange={(e) => { setEmail(e.target.value); setMessageError('') }} />
                                    <div className={email ? 'title-input hidden' : 'title-input'}>Email</div>
                                </div>
                                <div className={messageError ? 'flex gap-2 items-center mt-2 text-[12px] text-[#b3261e]' : 'hidden'}>
                                    <div><svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg></div>
                                    <div>{messageError}</div>
                                </div>
                                <div className='login-input-main mt-2'>
                                    <input type={isOnHidePassword ? "text" : "password"} className={'login-input'} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                    <div className={password ? 'title-input hidden' : 'title-input'}>Nhập mật khẩu của bạn</div>
                                </div>
                                <label className='flex items-center cursor-pointer gap-4 pt-2 text-[#1F1F1F] text-[14px] font-semibold'>
                                    <input type="checkbox" className='w-4 h-4 checkbox-password' value={isOnHidePassword} onChange={(e) => {
                                        setIsOnHidePassword(e.target.checked);
                                    }} />
                                    <span>Hiện mật khẩu</span>
                                </label>
                            </div>
                            <div className={isConfirm ? 'mt-10' : 'mt-10 hidden'}>
                                <div className='login-input-main mt-2'>
                                    <input type="text" className={messageErrorConfirm ? 'login-input  input-error' : 'login-input'} value={accessNumber} onChange={(e) => { setAccessNumber(e.target.value); setMessageError('') }} />
                                    <div className={accessNumber ? 'title-input hidden' : 'title-input'}>Nhập mã xác nhận</div>
                                </div>
                                <div className='text-[14px] text-[#b3261e]'>{messageErrorConfirm}</div>
                            </div>

                        </div>
                        <div className={isConfirm ? 'justify-end pt-14 gap-6 text-[14px] hidden' : 'flex justify-end pt-14 gap-6 text-[14px]'}>
                            <div>
                                <button className='text-white font-semibold bg-[#0b57d0] hover:bg-[#0e4eb5] px-6 py-2 rounded-3xl' onClick={HandleOnClickRegister}>Tiếp theo</button>
                            </div>
                        </div>

                        <div className={isConfirm ? 'justify-end pt-14 gap-6 text-[14px] flex' : 'hidden justify-end pt-14 gap-6 text-[14px]'}>
                            <div>
                                <button className='text-white font-semibold bg-[#0b57d0] hover:bg-[#0e4eb5] px-6 py-2 rounded-3xl' onClick={HandleOnClickRegisterConfirm}>Đăng ký</button>
                            </div>
                        </div>
                    </div>
                    <div className='text-[12px] text-[#1F1F1F] flex  justify-between mt-6 items-center'>
                        <div className='flex rounded-lg justify-between gap-20 py-2 px-3 hover:bg-[#e2e7eb] hover:cursor-pointer'>
                            <div>Tiếng việt</div>
                            <div><i className="fa-solid fa-sort-down"></i></div>
                        </div>
                        <div className='flex gap-3 '>
                            <div className='py-2 px-3 rounded-lg hover:bg-[#e2e7eb] hover:cursor-pointer'>
                                Trợ giúp
                            </div>
                            <div className='py-2 px-3 rounded-lg hover:bg-[#e2e7eb] hover:cursor-pointer'>
                                Quyền riêng tư
                            </div>
                            <div className='py-2 px-3 rounded-lg hover:bg-[#e2e7eb] hover:cursor-pointer'>
                                Điều khoản
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register