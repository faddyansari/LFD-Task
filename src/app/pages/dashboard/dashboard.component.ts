import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../model/userModel';
import { AuthenticationService } from 'src/app/services/AuthenticationService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class DashboardComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
  }
  GetDate() {
    let date = '';
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return date = mm + '/' + dd + '/' + yyyy;
  }
}
