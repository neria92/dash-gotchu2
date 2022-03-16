import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { DashboardRoutes } from "./DashboardRoutes";
import { Login } from "../login/Login";
import { startLoadinLogin } from "../actions/auth";
import { Spinner } from "../spinner/Spinner";



export const AppRouter = () => {

  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(startLoadinLogin(user.uid));
      }
    });
    setChecking(false);
  }, [dispatch, setChecking]);
  
  if (checking) return <Spinner/>

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/*'
          end
          element={
            <PrivateRoute
            >
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

