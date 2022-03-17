
// import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login } from '../login/Login';

export const PrivateRoute = ({ children }) => {


    return false
        ? children
        : <Login />


}

