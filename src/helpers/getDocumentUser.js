import { db } from "../firebase/firebaseConfig";

export const getDocumentUser = async (uid) => {

    const documento = await db
        .collection("users2")
        .doc(uid)
        .get()
        .then((doc) => {
            let data = "";
            if (doc.exists) {
                data = { ...doc.data(), uid: doc.id }
            }
            return data 
        });
    return documento
};

