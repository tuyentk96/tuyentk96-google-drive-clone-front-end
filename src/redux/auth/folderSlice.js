import { createSlice } from '@reduxjs/toolkit'

export const folderSlice = createSlice({
    name: 'folder',
    initialState: {
        refreshFolder: false,
        currentFolderId: ''
    },
    reducers: {
        createFolder: (state) => {
            state.refreshFolder = !state.refreshFolder
        },
        setCurrentFolder: (state, action) => {
            state.currentFolderId = action.payload.currentFolderId
        }
    }
})

// Action creators are generated for each case reducer function
export const { createFolder, setCurrentFolder } = folderSlice.actions

export default folderSlice.reducer