
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {doc, getFirestore, setDoc} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDMCS76bEAZrVmoEjVFg6asPYrIFUOfpV4",
  authDomain: "chatapp-b3668.firebaseapp.com",
  projectId: "chatapp-b3668",
  storageBucket: "chatapp-b3668.appspot.com",
  messagingSenderId: "61436926015",
  appId: "1:61436926015:web:7b5887f28a99faba9a008a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) =>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await setDoc(doc(db,"users",user.uid),{
        id:user.uid,
        username:username.toLowerCase(),
        email,
        name:"",
        avatar:"",
        bio:"Hey, There I am using Chat app",
        lastSeen:Date.now()
       })
       await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
       })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email,password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const logout = async (email,password) =>{
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}



export {signup,login,logout,auth,db}