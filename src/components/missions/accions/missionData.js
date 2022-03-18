import { types } from "../types/types";


export const addData = (data) => ({
    type: types.addData,
    payload: data
});

export const removeData = () => ({
    type: types.removeData
});