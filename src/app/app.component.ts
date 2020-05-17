import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/AuthenticationService';
import { Role } from './model/roleModel';
import { User } from './model/userModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
