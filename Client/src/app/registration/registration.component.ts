import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {

  }

  onRegisterButtonClicked(email: string, password1: string, password2: string, name: string) {
    if (password1 !== password2) {
      console.log("Try again");
    } else {
      this.authService.register(email, password1, name);
    }
  }
}
