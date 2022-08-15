import { initializeApp } from 'firebase/app';

import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCiK_u5_gBmHLWC57bAMHE-ESaU7aC8mF0",
    authDomain: "crwn-clothing-db-440cf.firebaseapp.com",
    projectId: "crwn-clothing-db-440cf",
    storageBucket: "crwn-clothing-db-440cf.appspot.com",
    messagingSenderId: "1011236287404",
    appId: "1:1011236287404:web:128d409d94f13399690009"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);


  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async(collectionkey, objectsToAdd) => {
    const collectionRef = collection(db, collectionkey);
    const batch = writeBatch(db);

    objectsToAdd.forEach ((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
  };

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  }

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      }
      catch (e) {
        console.log('Error creating user', e.message);
      }
    }

    return userDocRef;
  };
  
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  }
  
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut (auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);