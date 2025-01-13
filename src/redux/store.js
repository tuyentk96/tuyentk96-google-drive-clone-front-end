import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import folderReducer from './auth/folderSlice'

// Middleware để lưu trạng thái vào localStorage
const localStorageMiddleware = store => next => action => {
    let result = next(action); // Thực thi hành động bình thường
    const state = store.getState();
    localStorage.setItem('reduxState', JSON.stringify(state)); // Lưu trạng thái vào localStorage
    return result;
};

// Hàm khôi phục trạng thái từ localStorage
const preloadedState = () => {
    const storedState = localStorage.getItem('reduxState');
    return storedState ? JSON.parse(storedState) : {};
};

const store = configureStore({
    reducer: {
        auth: authReducer, // Thêm reducer vào store
        folder: folderReducer
    },
    preloadedState: preloadedState(), // Khôi phục trạng thái khi ứng dụng được tải lại
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware), // Thêm middleware vào store
});

export default store;
