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

  login() {
    this.router.navigate(['/login']);

  }

  logout() {
     this.auth.signOut();
  }

  register() {
    this.router.navigate(['/register']);
  }
}
