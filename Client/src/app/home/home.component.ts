import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public router: Router, public authService: AuthService) {

  }

  posts: any[] = [];


  ngOnInit() {
    this.loadHome();
    console.log(this.posts);
  }

  loadHome() {
    this.authService.home().subscribe((data) => {
      console.log(data);
      this.posts = data;
    });
  }

}
