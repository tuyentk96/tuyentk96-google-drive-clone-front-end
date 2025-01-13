import { useEffect, useState } from "react"
import { getListUserSearchByUsername } from "../../../service/accessService"
import _ from "lodash"
import { getFolderParrent, getListFolderByFolderParrentId } from "../../../service/adminService"


const ManagerFolders = () => {
    const [searchUser, setSearchUser] = useState()
    const [listSearch, setListSearch] = useState()
    const [userChoose, setUserChoose] = useState()
    const [listFolders, setListFolders] = useState()
    const [folderId, setFolderId] = useState()
    const [folderParrent, setFolderParrent] = useState()


    const fetchListSearch = async (searchUser) => {
        const response = await getListUserSearchByUsername(searchUser);
        if (response.statusCode === 200) {
            setListSearch(response.metadata.listUser || [])
        }
    }

    const fetchFolderParrent = async (folderId) => {
        const response = await getFolderParrent(folderId);
        if (response.statusCode === 200) {
            setFolderParrent(response.metadata.folder?.folderParent || null)
        }
    }


    const fetchListFolders = async (folderId) => {
        const response = await getListFolderByFolderParrentId(folderId);
        if (response.statusCode === 200) {
            setListFolders(response.metadata.listFolders || [])
        }
    }

    useEffect(() => {
        if (folderId && folderId.trim()) {
            fetchFolderParrent(folderId);
            fetchListFolders(folderId);
        }
    }, [folderId]);


    useEffect(() => {
        if (searchUser && searchUser.trim()) {
            fetchListSearch(searchUser);
        }
    }, [searchUser]);


    const handleClickChooseUser = (user) => {
        setUserChoose(user);
        setSearchUser('');
        setListSearch([]);
        setFolderId(user.storage);
    };

    const handleOnClickPrev = () => {
        setFolderId(folderParrent?._id)
    }


    return (
        <>
            <div className="home-container text-[#1F1F1F] pl-4">
                <div className="home-title text-center pt-[14px] pb-[6px] text-[24px] mb-4">
                    ADMIN MANAGER / Manager Folders
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
                    {folderParrent && <div className="h-[48px] pl-2 border-b-[1px] flex items-center font-bold text-[16px] hover:bg-[#F0F4F8]" onDoubleClick={handleOnClickPrev}>
                        ...
                    </div>}
                    {listFolders && listFolders.map((folder, index) => {
                        return (
                            <>
                                <div className="flex h-[48px] border-b-[1px] items-center text-[14px] hover:bg-[#F0F4F8]"
                                    key={index}
                                    onDoubleClick={() => {
                                        if (folder.nameFolder) {
                                            setFolderId(folder._id)
                                        }
                                    }}>
                                    <div className="w-[25%]">
                                        {folder.nameFolder && <div className=" flex gap-4 items-center">
                                            <svg focusable="false" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><g><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></g></svg>
                                            <div>{folder.nameFolder}</div>
                                        </div>}
                                        {folder.nameFile && <div className=" flex gap-4 items-center">
                                            <div><img className="w-6 h-6" src="https://drive-thirdparty.googleusercontent.com/16/type/application/octetstream" alt="Unknown File" /></div>
                                            <div>{folder.nameFile}</div>
                                        </div>}
                                    </div>
                                    <div className="w-[25%]">
                                        {userChoose.username}@gmail.com
                                    </div>
                                    <div className="w-[25%]">
                                        {(new Date(folder.openedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))}
                                    </div>
                                    <div className="w-[25%]">
                                        {folder.memories} KB
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

export default ManagerFolders