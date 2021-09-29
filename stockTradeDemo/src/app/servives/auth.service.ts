import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSate: any = null;
  newUser: any;

  constructor( private afu: AngularFireAuth, 
        private db: AngularFirestore,
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

 
   get isUserEmailloggedIn(): boolean {
     if((this.authSate !== null) && (!this.isUserAnonymousloggedIn)) {
       return true
     }
     else false
   }

   registerwithemail(email:string, password:string )
   {
     return this.afu.createUserWithEmailAndPassword(email,password)
     .then((user)=>
     {
       this.authSate = user;
     })
     .catch(error =>{
        console.log(error)
        throw error
      });
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
  /*create new user
  createUser(user) {
    console.log(user);
    this.afu.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/home']);
          });
      })
      .catch( error => {
        console.log(error)
        throw error
      });
  }

  insertUserData() {
    return this.db.doc(`Users/${this.authSate.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user'
    })
  }*/
}