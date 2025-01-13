import { useEffect, useState } from "react"
import { getListUserSearchByUsername } from "../../../service/accessService"
import _ from "lodash"
import { getTrashByUserId } from "../../../service/adminService"


const ManagerTrash = () => {
    const [searchUser, setSearchUser] = useState()
    const [listSearch, setListSearch] = useState()
    const [userChoose, setUserChoose] = useState()
    const [listTrash, setListTrash] = useState()

    const fetchListSearch = async (searchUser) => {
        const response = await getListUserSearchByUsername(searchUser);
        if (response.statusCode === 200) {
            setListSearch(response.metadata.listUser)
        }
    }

    const fetchListFiles = async (userChoose) => {
        const response = await getTrashByUserId(userChoose._id)
        if (response.statusCode === 200) {
            setListTrash(response.metadata.listTrash)
        }
    }

    console.log(listTrash);




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
                    ADMIN MANAGER / Manager Trash
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
                    {!_.isEmpty(listTrash) && <div>
                        {listTrash.map((folder, index) => {
                            return (
                                <>
                                    <div className="hover:bg-[#F0F4F8] group flex h-[48px] border-b-[1px] items-center text-[14px]" key={index}>
                                        <div className="w-[25%] flex items-center gap-2 pl-4 pr-10 overflow-ellipsis">
                                            <div className="overflow-hidden whitespace-nowrap  font-medium">
                                                {folder.nameFolder ? folder.nameFolder : folder.nameFile}
                                            </div>
                                            <div>
                                                <svg width="16px" height="16px" viewBox="0 0 16 16" focusable="false" fill=""><path d="M5,7 C6.11,7 7,6.1 7,5 C7,3.9 6.11,3 5,3 C3.9,3 3,3.9 3,5 C3,6.1 3.9,7 5,7 L5,7 Z M11,7 C12.11,7 13,6.1 13,5 C13,3.9 12.11,3 11,3 C9.89,3 9,3.9 9,5 C9,6.1 9.9,7 11,7 L11,7 Z M5,8.2 C3.33,8.2 0,9.03 0,10.7 L0,12 L10,12 L10,10.7 C10,9.03 6.67,8.2 5,8.2 L5,8.2 Z M11,8.2 C10.75,8.2 10.46,8.22 10.16,8.26 C10.95,8.86 11.5,9.66 11.5,10.7 L11.5,12 L16,12 L16,10.7 C16,9.03 12.67,8.2 11,8.2 L11,8.2 Z"></path></svg>
                                            </div>
                                        </div>
                                        <div className="w-[25%] text-[#5E5E5E]">
                                            {folder.createdBy.username}@gmail.com
                                        </div>
                                        <div className="w-[25%] text-[#444746] overflow-hidden whitespace-nowrap font-notoSans">

                                            <div>
                                                {(new Date(folder.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))}
                                            </div>
                                        </div>
                                        <div className="w-[25%] flex gap-3">
                                            <div>
                                                {folder.memories} KB
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>}
                </div>
            </div>


        </>
    )
}

export default ManagerTrash