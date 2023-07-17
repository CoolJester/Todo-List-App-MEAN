import { Component } from '@angular/core';
import { HeaderService } from '../shared/services/header.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerFirst: boolean = true;
  matches: boolean = true;
  error: boolean = false;
  userExists: boolean = false;

  //binding the frontend data
  password = '';
  cPassword = '';

  constructor(
    public headerService: HeaderService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    //Fixing the header
    this.headerService.changeState('user');
  }

  formSubmit(form: any) {
    //Check if passwords match first
    if (this.password === this.cPassword) {
      this.authService
        .register(form.value.email, form.value.password)
        .subscribe(
          (data: any) => {
            //Store the token to the localstorage
            localStorage.setItem('token', data.token);
            //Redirect to main
            this.router.navigate(['/main']);
          },
          (error) => {
            switch (error.status) {
              case 403:
                //User already exists
                this.userExists = true;
                break;
              case 400:
                //Failed to store
                this.error = true;
                break;
              case 500:
                //Error with hashing
                this.error = true;
                break;
            }
          }
        );
    } else {
      this.matches = false;
    }
  }

  onChange() {
    this.matches =
      this.password.trim() === this.cPassword.trim() ? true : false;
  }
}
