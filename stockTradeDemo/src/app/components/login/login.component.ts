import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servives/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = "";
  password = "";
  succesMessage = "";
  errorMessage = ""; //error validation 
  error: {name: string, message: string } = {name: "" ,message: "" }; // error in firebase

    
  constructor(private authservice: AuthService, private router: Router) { }


  ngOnInit(): void {
  }

  clearErrorMessage(){
    this.error ={name: "" ,message: "" },
    this.errorMessage = "";
    this.succesMessage = "";
  };

  onLogin(){
   
    this.clearErrorMessage();
    if(this.validateForm(this.email,this.password)){
      this.authservice.loginwithemail(this.email, this.password)
      .then(() => {
        this.succesMessage = "Sign UP successful!!!"
        this.router.navigate(['/userinfo'])
      }).catch(_error =>{
        this.error = _error
        this.router.navigate(['/login'])
        
      })
    }
  }
  //checking the email & password our side
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
