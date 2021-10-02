import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "src/app/servives/auth.service";
import { Router } from "@angular/router";
import {FormControl, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
 
  constructor(private authservice: AuthService, 
              private router: Router,
              private formBuilder:FormBuilder) { }
  
  ngOnInit(): void {
    
  }
  
  
  profileForm = this.formBuilder.group({
    firstName:[''],
    lastName:[''],
    email:[''],
    password:[''],
    webSite:[''],
    img:['']
  });
  
  
  saveForm(){
    console.log('Form data is ', this.profileForm.value);
  }
 
  @ViewChild('fileInput')
  fileInput;

  file: File | null = null;

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];

    console.log(this.file);
  }
  createUser(profileForm) {
    this.uploadProfile(this.file);
    this.authservice.createUser(profileForm.value);
    
  }

  uploadProfile(file){
    this.authservice.uploadProfileImage(file)
  }
  
}
