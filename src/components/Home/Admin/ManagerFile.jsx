import { useEffect, useState } from "react"
import { getListUserSearchByUsername } from "../../../service/accessService"
import _ from "lodash"
import { getFilesByUserId } from "../../../service/adminService"


const ManagerFile = () => {
    const [searchUser, setSearchUser] = useState()
    const [listSearch, setListSearch] = useState()
    const [userChoose, setUserChoose] = useState()
    const [listFiles, setListFiles] = useState()

    const fetchListSearch = async (searchUser) => {
        const response = await getListUserSearchByUsername(searchUser);
        if (response.statusCode === 200) {
            setListSearch(response.metadata.listUser)
        }
    }

    const fetchListFiles = async (userChoose) => {
        const response = await getFilesByUserId(userChoose._id)
        if (response.statusCode === 200) {
            setListFiles(response.metadata.listFiles)
        }
    }



    useEffect(() => {
        if (userChoose) {
            fetchListFiles(userChoose)
        }
    }, [userChoose])


    useEffect(() => {
        if (searchUser) {
            fetchListSearch(searchUser)
        }
    }, [searchUser])

    const handleClickChooseUser = (user) => {
        setUserChoose(user)
        setSearchUser('')
        setListSearch([])
    }



    return (
        <>
            <div className="home-container text-[#1F1F1F] pl-4">
                <div className="home-title text-center pt-[14px] pb-[6px] text-[24px] mb-4">
                    ADMIN MANAGER / Manager File
                </div>

                <div className="flex gap-4">
                    <div>Search User</div>
                    <div>
                        <input value={searchUser} onChange={(e) => setSearchUser(e.target.value)} type="text" className='border px-2 w-[300px] border-[#747775] outline-none rounded  focus:border-[#0b57d0] focus:border-[2px]' />
                        {!_.isEmpty(listSearch) && <div>
                            <div className={searchUser ? "bg-[#e9eef6] text-[#1F1F1F] w-[300px] text-[16px] py-1 shadow-lg absolute z-10" : 'hidden'}>
                                {listSearch && listSearch.map((user, index) => {
                                    return (
                                        <>
                                            <div className="hover:bg-[#e0e5ec] pl-4" key={index} onClick={() => handleClickChooseUser(user)}>
                                                <div className="font-semibold">
                                                    {user.username}
                                                </div>
                                                <div className="text-[#444746]">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>}
                    </div>
                </div>

                <div className="text-[24px] mt-4">
                    <div>
                        User: {userChoose && userChoose.username}
                    </div>
                </div>

                <div>
                    <div className="flex h-[48px] border-b-[1px] items-center text-[14px] font-medium">
                        <div className="w-[25%]">
                            Name
                        </div>
                        <div className="w-[25%]">
                            Owner
                        </div>
                        <div className="w-[25%]">
                            Last modified
                        </div>
                        <div className="w-[25%]">
                            File size
                        </div>
                    </div>
                    {listFiles && listFiles.map((file, index) => {
                        return (
                            <>
                                <div className="flex h-[48px] border-b-[1px] items-center text-[14px] hover:bg-[#F0F4F8]" key={index}>
                                    <div className="w-[25%]">
                                        {file.nameFile}
                                    </div>
                                    <div className="w-[25%]">
                                        {userChoose.username}@gmail.com
                                    </div>
                                    <div className="w-[25%]">
                                        {(new Date(file.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))}
                                    </div>
                                    <div className="w-[25%]">
                                        {file.memories} KB
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

export default ManagerFile