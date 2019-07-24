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


  function createChatRoom(friendID){
    const userID=auth.currentUser.uid;
    let chatExists=false;
    // console.log('friendID----->',friendID)
    // console.log('userID------->',userID)

    return new Promise((resolve,reject)=>{
        
        db.collection('chatrooms')
        .where('users.'+userID,'==',true)
        .where('users.'+friendID,'==',true)
        .get().then(snapshot=>{
            snapshot.forEach(elem=>{
                chatExists={data:elem.data(),chatroomID:elem.id}
            })

            if(!chatExists){
                const obj={
                createdAt:Date.now(),
                users:{
                    [userID]:true,
                    [friendID]:true,
                }
            }
            db.collection('chatrooms').add(obj).then(snapshot=>{
                resolve({data:obj,chatroomID:snapshot.id})
            })
            }else{
                resolve(chatExists)
            }
    
        })


        //my logic for creating chatroom but it fails bcoz every user chatroom is created
        // const obj={
        //     createdAt:Date.now(),
        //     users:{
        //         friendID:friendID,
        //         userID:userID,
        //     }
        // }
        //    db.collection('chatrooms').doc(friendID+userID).get()
        //    .then(snapshot=>{
        //        console.log(snapshot)
        //         console.log('chatroom exist====>',snapshot.exists);    
        //     if(!snapshot.exists){
        //         db.collection('chatrooms').doc(friendID+userID).set(obj).then(()=>{
        //             console.log('if false it will create generate chatroom------>')
        //             resolve({data:obj,chatroomID:friendID+userID})
        //         })
        //     }else{
        //         resolve({data:snapshot.data(),chatroomID:snapshot.id})
        //     }
        // })

        

       
    })

  }



 function sendMessagesToDB(chatroomID,message){
    //  console.log('chatroomID--------->',chatroomID)
    //  console.log('text--------------->',text)
    const obj={
        message,
        userID:auth.currentUser.uid,
        timestamp:Date.now(),
    }
    return db.collection('chatrooms').doc(chatroomID).collection('messages').add(obj)
  }





  export {
      auth,
      db,
      signupUser,
      signinUser,
      getAllUsers,
      createChatRoom,
      sendMessagesToDB
  }