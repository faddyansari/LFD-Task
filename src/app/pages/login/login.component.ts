import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/AuthenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  SubmitForm() {
    this.loading = true;
    this.authenticationService.login(this.loginForm.get('userName').value, this.loginForm.get('password').value).subscribe(response => {
      this.router.navigateByUrl('/dashboard');
      this.loading = false;
    }, err => {
      this.error = err.error.message;
      setTimeout(() => {
        this.error = ''
      }, 5000);
      this.loading = false;
    });
  }
}

