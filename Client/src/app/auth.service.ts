import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { Post } from './models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  login(userEmail: string, password: string) {
    this.http.post(`http://localhost:8080/user/login`, {
      userEmail,
      password
    }).subscribe((result: any) => {
      // console.log(result)
      localStorage.setItem("token", result.token);
      this.router.navigate(['/home'])
    })
  }

  register(userEmail: string, password: string, userName: string) {
    this.http.post(`http://localhost:8080/user/signUp`, {
      userEmail,
      userName,
      password
    }).subscribe((result: any) => {
      this.router.navigate(['/home'])
    })
  }


  home(): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    return this.http.get("http://localhost:8080/post/get", { headers });
    // console.log(result)
    // this.posts = result;
    // console.log(this.posts);
    // console.log(this.posts[0].content);

  }
}
