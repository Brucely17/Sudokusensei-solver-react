import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDgalMGz8FPDNIRHKpSW50RIDjH0sjcEcw",
    authDomain: "sudokusensei-fa2a2.firebaseapp.com",
    projectId: "sudokusensei-fa2a2",
    storageBucket: "sudokusensei-fa2a2.appspot.com",
    messagingSenderId: "827124360690",
    appId: "1:827124360690:web:394415fe088962839c376b"
  };

const fire =initializeApp(firebaseConfig);
export const auth = getAuth(fire);







