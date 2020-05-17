import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../model/userModel';
import { Role } from '../model/roleModel';
const users: User[] = [
    { id: 1, username: 'superadmin', password: 'superadmin', role: Role.Admin },
    { id: 2, username: 'admin', password: 'admin', role: Role.User }
];

const family = [
    { name: 'Ahmed Khurrum', relation: 'Base Node' },
    { name: 'Kareem Khurrum', relation: 'Brother' },
    { name: 'Sultan Khurrum', relation: 'Brother' },
    { name: 'Azhar Khurrum', relation: 'Brother' },
    { name: 'Faiz Ahmed ', relation: 'Son' },
    { name: 'Hina Khurrum', relation: 'Wife' },
    { name: 'Shugufta', relation: 'Mother' },
    { name: 'Alina', relation: 'Mother-in-Law' },
    { name: 'Khurrum Javed', relation: 'Father' },
    { name: 'Zaid', relation: 'father-in-Law' },
    { name: 'Sabiha', relation: 'Sister' }
]

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
            .pipe(delay(500))
            .pipe(dematerialize());
        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/deleteFamilyMember') && method === 'POST':
                    return deleteFamilyMember();
                case url.endsWith('/editFamilyMember') && method === 'POST':
                    return editFamilyMember();
                case url.endsWith('/getFamilyMembers') && method === 'GET':
                    return getFamily();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }
        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                role: user.role,
                token: `fake-jwt-token.${user.id}`
            });
        }

        function getFamily() {
            return ok(family);
        }

        function deleteFamilyMember() {
            const { name } = body;
            let index = family.findIndex(ind => ind.name == name);
            family.splice(index, 1);
            return ok(family);
        }

        function editFamilyMember() {
            const { name,index } = body;
            family[index].name = name;
            return ok(family);
        }

        // helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};