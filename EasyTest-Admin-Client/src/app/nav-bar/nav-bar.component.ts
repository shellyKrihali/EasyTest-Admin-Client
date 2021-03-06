import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  collapsed = true;
  imagePath: string;
  headerEmail: string;
  fileSearch: string;
  user: User;

  @Output() messageEvent = new EventEmitter<string>();


  constructor(private service: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  getLoggedUser() {
    const isAuth = this.cookieService.check("admin");
    if (isAuth) {
      this.user = this.service.user;
      return true;
    } else {
      return false;
    }
  }
  sendMessage() {
    this.messageEvent.emit("sec")
  }

  logOut() {
    console.log("Log Out");
    this.cookieService.delete("admin");
    this.cookieService.delete("token-admin");
    this.router.navigate(['/log-in']);
  }
}
