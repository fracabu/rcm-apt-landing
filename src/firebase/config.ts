import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyAibUFbr1S410F270h_EoU9FTx6ollplBU",
  authDomain: "romacaputmundiapt.firebaseapp.com",
  projectId: "romacaputmundiapt",
  storageBucket: "romacaputmundiapt.firebasestorage.app",
  messagingSenderId: "91232142600",
  appId: "1:91232142600:web:2c51c353c825140a8018bd",
  measurementId: "G-GXE7M8Q6N3"
}

const app = initializeApp(firebaseConfig)

// Esportazioni corrette
export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)

export default app