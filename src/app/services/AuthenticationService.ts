import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../model/userModel';

@Injectable()
export class AuthenticationService {
    public currentUserRole = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    public currentUser: Observable<User>;
    apiUrl = environment.apiUrl;
    
    constructor(private http: HttpClient) {
        this.currentUser = this.currentUserRole.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserRole.value;
    }

    // login(username: string, password: string) :Observable<any> {
    //     return new Observable(observer => {
    //     this.http.post(this.apiUrl + '/authenticate', { username, password })
    //     .pipe(map(user => {
    //         // login successful if there's a jwt token in the response
    //         if (user) {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserRole.next(user);
    //         }

    //         return user;
    //     }));
    // }


    
    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserRole.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserRole.next(null);
    }
}