import { Observable } from 'rxjs';
import { Injectable, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class DataService {
    apiUrl = environment.apiUrl;
    toasts: any[] = [];
    constructor(private http: HttpClient) { }

    getAllFamily(): Observable<any> {
        return new Observable((observer) => {
            this.http.get<any>(this.apiUrl + '/getFamilyMembers').subscribe(value => {
                observer.next(value)
                observer.complete();
            });
        });
    }

    deleteMember(name): Observable<any>{
        return new Observable((observer) => {
            this.http.post<any>(this.apiUrl + '/deleteFamilyMember',{name}).subscribe(value => {
                observer.next(value)
                observer.complete();
            });
        });
    }
    editMember(name,index): Observable<any>{
        return new Observable((observer) => {
            this.http.post<any>(this.apiUrl + '/editFamilyMember',{name,index}).subscribe(value => {
                observer.next(value)
                observer.complete();
            });
        });
    }
    
    show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
        this.toasts.push({ textOrTpl, ...options });
    }

}