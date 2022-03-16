
import {  Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = ({ children }) => {

    const { uid } = useSelector(state => state.auth)
    console.log('uid',uid)
    return uid
        ?<Navigate to='/' />
        : children


}

