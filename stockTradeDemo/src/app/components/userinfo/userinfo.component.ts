import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/servives/auth.service";
import {AngularFireStorage} from '@angular/fire/storage/';



@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  user:any;
  imgSrc : string = "assets/images/upload-1.png";

  constructor(public authservice: AuthService, 
              private fdb: AngularFireStorage) {    

                }

  

  ngOnInit() {
    this.authservice.getUserState().subscribe( user => {this.user = user;})
      this.downloadProfileImg()
  }

  downloadProfileImg(){
    const ref = this.fdb.ref(`users/${this.authservice.currentUserId}/profile.jpg`);
      ref.getDownloadURL().subscribe((url) => this.imgSrc = url );

  }

  onSignOut(){
    this.authservice.signOut();
  }
}