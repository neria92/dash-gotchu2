import { uuid } from "../helpers/uuid";
import { firebase } from "./firebaseConfig";

//FUNCION PARA GUARDAR LA IMAGEN EN FIREBASE
export const uploadImage = async ( image ) => {
  try {
    const newRef = firebase.storage('missions').child('dash'); // nombre del archivo
    await newRef.put(image);
    let urlImagen = await newRef.getDownloadURL()
    console.log('la ul de la imagen es' + urlImagen);
    return urlImagen
  } catch (error) {
    alert(error);
  }
};