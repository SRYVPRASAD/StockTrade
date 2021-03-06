import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { PostlistComponent } from './components/postlist/postlist.component'

import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path : "" , redirectTo: "/login" , pathMatch: "full" },

  { path : "login", component : LoginComponent },
  { path : "register" , component:RegisterComponent },
  { path : "home", component : HomeComponent, canActivate:[AuthGuard] },
  { path : "userinfo", component : UserinfoComponent, canActivate:[AuthGuard] },
  { path : "post", component : PostComponent },
  { path : "postlist", component : PostlistComponent, canActivate:[AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
