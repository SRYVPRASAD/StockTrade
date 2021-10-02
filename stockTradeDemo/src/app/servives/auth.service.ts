import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';

import { finalize } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSate: any = null;
  newUser: any;
  proImage :any;

  constructor( private afu: AngularFireAuth, 
        private db: AngularFirestore,
        private fdb : AngularFireStorage,
        private router :Router) {

    this.afu.authState.subscribe((auth =>{
        this.authSate = auth;
      }))
   }
   
   get isUserAnonymousloggedIn():boolean{
     return (this.authSate !==null) ? this.authSate.isAnonymous : false
   }
 
   get currentUserId(): string{
     return (this.authSate !== null ) ? this.authSate.uid : ''
   }
 
   get currentUserName(): string {
     return this.authSate['email']
   }

   get currentUser(): any {
    return (this.authSate !== null) ? this.authSate : null ;
  }
  getUserState() {
    return this.afu.authState;
  }

 
   get isUserEmailloggedIn(): boolean {
     if((this.authSate !== null) && (!this.isUserAnonymousloggedIn)) {
       return true
     }
     else false
   }

  loginwithemail(email:string, password:string ){
    return this.afu.signInWithEmailAndPassword(email,password)
     .then((user)=>
     {
       this.authSate = user;
     })
     .catch(error =>{
        console.log(error)
        throw error
      });

  }

  signOut(): void
  {
    this.afu.signOut();
    this.router.navigate(['/login']);

  }
 
  createUser(user) {
    this.afu.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName
        });
        this.insertUserData(userCredential.user)
          .then(() => {
            this.router.navigate(['/userinfo']);
          });
          
      })
      .catch( error => {
        console.log(error)
        throw error
      });
  }
 
  uploadProfileImage(image){
    this.proImage = image    
  }
  
  insertUserData(userCre) {
    var filePath = `users/${userCre.uid}/profile.jpg`;
    const fileRef = this.fdb.ref(filePath);
    this.fdb.upload(filePath, this.proImage) ;
    return this.db.doc(`Users/${userCre.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      profileIMG: this.newUser.img,
      webSite: this.newUser.webSite,

    })
  }
}

