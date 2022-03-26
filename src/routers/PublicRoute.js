
import {  Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = ({ children }) => {

    const { isAdmin } = useSelector(state => state.auth)
    
    return isAdmin
        ?<Navigate to='/' />
        : children


}

