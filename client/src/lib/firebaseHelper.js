import { collection, getDocs, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export const firestoreRequest = async (params) => {
    const dbRef = collection(db, 'users');

    try {

        if (params.api === 'fetchUsers') {
            const querySnapshot = await getDocs(dbRef);
            const response = querySnapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id, id: doc.id }));
            console.log({ response })
            return response;
        }

        if (params.api === 'createUser') {
            const { content = {} } = params;
            const response = await addDoc(dbRef, content);
            console.log({ response });
            return response;
        }

        if (params.api === 'updateUser') {
            const { content = {}, extraContent = {} } = params;
            const docRef = doc(db, 'users', extraContent.id)
            const response = await setDoc(docRef, content);
            console.log({ response })
            return true;
        }

        if (params.api === 'deleteUser') {
            const { extraContent = {} } = params;
            const docRef = doc(db, 'users', extraContent.id)
            const response = await deleteDoc(docRef);
            console.log({ response })
            return true;
        }


    } catch (err) {
        console.log('err', err)
        return false;
    }

}