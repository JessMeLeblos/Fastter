import { Route } from '@angular/compiler/src/core';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private authSvc: AuthService, private router: Router) { }

  async onLogin(email, password){
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if(user){
        //CheackEmail
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified)
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  async onGoogle(){
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified)
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  private redirectUser(isVerified: boolean) : void{
    if(isVerified){
      this.router.navigate(['admin']);
    }else{
      this.router.navigate(['verify-email']);
    }
    // Redireccion a Admin
    //else redireccion verificacion

  }
}
