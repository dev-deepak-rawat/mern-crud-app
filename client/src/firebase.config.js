import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { FIREBASE_CONFIG } from "./lib/constants";

export const firebaseApp = initializeApp(FIREBASE_CONFIG);
export const db = getFirestore();

