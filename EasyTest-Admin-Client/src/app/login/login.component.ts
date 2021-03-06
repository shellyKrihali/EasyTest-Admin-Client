import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../models/user'
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  serverErr: string;
  isValid: boolean = true;
  loginForm = this.fb.group({
    email: ['', {validators: [Validators.required, Validators.email]}

    ],
    password: ['', {validators: [Validators.required, Validators.minLength(5)]}],
  });

  constructor(
    private router: Router,
    private service: UserService,
    private fb: FormBuilder,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    //this.isValidDetails = true;
  }

  onSubmitLogIn() {

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    console.log(email);
    console.log(password);
    
    this.isValid = true;
    this.service.login(email, password).catch((err: HttpErrorResponse) => {
      console.log('An error occurred:', err.error);
      this.serverErr = err.error.message;
      this.isValid = false;
    }).then(() => {
      if (!this.service.checkIfUserIsAdmin()) {
        this.serverErr = 'User is not admin';
        this.isValid = false;
        this.service.logOut();
        return;
      }
      if (this.isValid) {
        this.gotoHome();
      }

    });


  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  isValidEmailCheack() {
    return this.isValid
  }
}
