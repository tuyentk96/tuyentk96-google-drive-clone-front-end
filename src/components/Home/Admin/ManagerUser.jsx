import { useEffect, useState } from "react"
import { getAllUsers } from "../../../service/adminService"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const ManagerUser = () => {
    const [listUsers, setListUsers] = useState()
    const role = useSelector(state => state.auth.role)
    const navigate = useNavigate()

    const fetchListUsers = async () => {
        const response = await getAllUsers()
        if (response.statusCode === 200) {
            setListUsers(response.metadata.listUsers)
        }
    }

    useEffect(() => {
        if (role !== 'ADMIN') {
            navigate('/')
        }
    }, [role])

    useEffect(() => {
        fetchListUsers()
    }, [])

    console.log(listUsers);


    return (
        <>
            <div className="home-container text-[#1F1F1F] pl-4">
                <div className="home-title text-center pt-[14px] pb-[6px] text-[24px] mb-4">
                    ADMIN MANAGER / Manager User
                </div>

                <div>
                    <div className="flex h-[48px] border-b-[1px] items-center text-[14px] font-medium">
                        <div className="w-[25%]">
                            Username
                        </div>
                        <div className="w-[25%]">
                            Email
                        </div>
                        <div className="w-[25%]">
                            Created At
                        </div>
                        <div className="w-[25%]">
                            Storage
                        </div>
                    </div>
                    {listUsers && listUsers.map((user, index) => {
                        return (
                            <>
                                <div className="flex h-[48px] border-b-[1px] items-center text-[14px] hover:bg-[#F0F4F8]" key={index}>
                                    <div className="w-[25%]">
                                        {user.username}
                                    </div>
                                    <div className="w-[25%]">
                                        {user.email}
                                    </div>
                                    <div className="w-[25%]">
                                        {(new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))}
                                    </div>
                                    <div className="w-[25%]">
                                        {user.storage.memories} KB
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>


        </>
    )
}

export default ManagerUser