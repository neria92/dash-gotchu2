import Swal from "sweetalert2";

import { types } from "../types/type";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { startLoading, finishLoading } from "./ui";
import { getDocumentUser } from "../helpers/getDocumentUser";

export const startLoginEmailPasword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(startLoadinLogin(user.uid));
        dispatch(finishLoading());
      })
      .catch((err) => {
        dispatch(finishLoading());
        Swal.fire(
          "Error",
          "Este usuario no existe o esta ingresando mal la contraseña",
          "error"
        );
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const startLoadinLogin=(uid)=>{
  return async(dispatch)=>{
    const doc = await getDocumentUser(uid)
    dispatch(login(doc.uid, doc.userData.email,doc.userData.photo,doc.userData.name,));
  }

}

export const login = (uid,email,photoURL,displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
      photoURL,
      email,
    },
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});

