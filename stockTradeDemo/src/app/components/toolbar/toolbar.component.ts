import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servives/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private auth: AuthService, 
    private router: Router) { }
    user:any;
  ngOnInit() {
    this.auth.getUserState()
    .subscribe( user => {
      this.user = user;})
  }

 signIn() {
    this.router.navigate(['/login']);

  }

  signOut() {
     this.auth.signOut();
  }

  signUp() {
    this.router.navigate(['/register']);
  }
}
