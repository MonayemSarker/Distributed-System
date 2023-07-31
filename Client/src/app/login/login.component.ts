import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  onLoginButtonClicked(email: string, password: string): void {
    this.authService.login(email, password);
    // .subscribe(
    //   (res: HttpResponse<any>) => {
    //     if (res.status === 200) {
    //       this.router.navigate(['/home'])
    //     }
    //   },
    //   (error) => {
    //     window.alert('Incorrect password. Please try again.');
    //   }
    // );
  }
}
