import * as firebase from 'firebase';
import 'firebase/firestore'
import { resolve, reject } from 'q';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBnU2tI8lnMFibcrCWelKdT816MZs6Tl4k",
    authDomain: "friendly-chat-210.firebaseapp.com",
    databaseURL: "https://friendly-chat-210.firebaseio.com",
    projectId: "friendly-chat-210",
    storageBucket: "friendly-chat-210.appspot.com",
    messagingSenderId: "302860739190",
    appId: "1:302860739190:web:24584fd55a5a43ab"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth=firebase.auth();
  const db=firebase.firestore();
  const storage=firebase.storage();


  //when user come to signup page and enter email and password then
  //creating email and password with authentication

  function signupUser(email,password){
      return new Promise((resolve,reject)=>{
            auth.createUserWithEmailAndPassword(email,password).then(res=>{
                db.collection('users').doc(res.user.uid).set({email,password,createdAt:Date.now()}).then(res=>{
                resolve({message:'Sign up successfully!'})
                
                
            }).catch(err=>{
                // alert(err.message);
                // throw new Error(err.message)
                reject(new Error(err.message));
            })
        }).catch(err=>{
            // alert(err.message)
            // throw new Error(err.message)
            reject(new Error(err.message));
        })
        // reject(new Error('error in sign up'));
      })
  }

  function signinUser(email,password){
      return new Promise((resolve,reject)=>{
        auth.signInWithEmailAndPassword(email, password).then(res=>{
            resolve({message:'Sign in successfully!'})
        })
        .catch(err=>{
            reject(new Error(err.message))
        })
      })

  }

  function getAllUsers(){
      return new Promise((resolve,reject)=>{
          db.collection('users').get().then(snap=>{
              const users=[];
              snap.forEach(elem=>{
                  if(elem.data().email ){
                      users.push({email:elem.data().email,_id:elem.id})
                  }
              })
              resolve(users)
          })
      })
  }






  export {
      auth,
      db,
      signupUser,
      signinUser,
      getAllUsers,
  }