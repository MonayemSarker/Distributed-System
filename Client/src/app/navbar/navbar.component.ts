import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {

  }
  postContent: string = '';
  isPostPopupVisible: boolean = false;
  token = localStorage.getItem('token') || "";
  isToken: boolean = false;
  decodedToken: any;

  togglePostPopup() {
    this.isPostPopupVisible = !this.isPostPopupVisible;
  }

  cancelPost() {
    this.isPostPopupVisible = false;
  }

  submitPost() {
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)

    try {
      this.decodedToken = jwt_decode(this.token);

      const userEmail = this.decodedToken.userEmail;
      const content = this.postContent;
      this.http.post(`http://localhost:8080/post/create/${userEmail}`, {
        content
      }, { headers }).subscribe(
        (response) => {
          console.log('Post request successful:', response);
          // Handle the response from the server here if needed
          this.isPostPopupVisible = false; // Close the modal after successful post
        },
        (error) => {
          console.error('Error in post request:', error);
        }
      );
      console.log(content);
      console.log(userEmail)
      this.isPostPopupVisible = false;
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 100);

    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  ngOnInit(): void {
    if (this.token) {
      this.isToken = true;
    }
  }
}
