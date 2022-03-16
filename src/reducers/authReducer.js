import { types } from "../types/type";

export const authReducer=(state={},action)=>{
    switch (action.type) {
        case types.login:
            return{
                uid:action.payload.uid,
                name:action.payload.displayName,
                photoURL:action.payload.photoURL,
                email:action.payload.email,
                company:action.payload.company,
                isAdmi:action.payload.isAdmi,
                supervisor:action.payload.supervisor
            }
            
        case types.logout:
            return {}
    
        default:
            return state;
    }


}