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

  selectedImage = '';
  hide = true;
  succesMessage = "";
  errorMessage = ""; //error validation 
  error: {name: string, message: string } = {name: "" ,message: "" }; // error in firebase

  constructor(private authservice: AuthService, 
              private router: Router,
              private formBuilder:FormBuilder) { }
              
  profileForm = this.formBuilder.group({
    
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
    webSite:['',Validators.required],
    img:['',Validators.required]
  });
  
 
  ngOnInit(): void {
    
  }
  clearErrorMessage(){
    this.error ={name: "" ,message: "" },
    this.errorMessage = "";
    this.succesMessage = "";
  };

  showPreview(event){
    this.selectedImage = event.target.files[0];
  }

  onSubmit(profileForm) {

    console.log(profileForm);
    this.clearErrorMessage();
    if(this.validateForm(profileForm.email,profileForm.password)){
      this.uploadProfile(this.selectedImage);
    this.authservice.createUser(profileForm)
    .then(() => {
      this.router.navigate(['/userinfo'])
    }).catch(_error =>{
      this.error = _error 
    }) 
  }

  }


  get formControls() {
    return this.profileForm;
  }

  uploadProfile(file){
    this.authservice.uploadProfileImage(file);
  }


  validateForm(email, password)
  {
    if(email.length === 0){
      this.errorMessage = "please enter the email ID .";
      
      return false;
    }

    if(password.length === 0){
      this.errorMessage = "please enter the password .";
      
      return false;
    }
    if(password.length < 6){
      this.errorMessage = "please enter more than 6 character .";
      
      return false;
    }

    this.errorMessage = " ";
    return true;
  }
  
}
