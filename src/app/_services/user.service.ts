import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';

const headers = new HttpHeaders().set('Content-Type', 'text/plain')
                                .set('Accept', 'application/json; charset=utf-8')
                                

// const headers = new HttpHeaders();
// headers.append('Content-Type', 'application/x-www-form-urlencoded');
// headers.append('Content-Type', 'application/json; charset=utf-8');
const API_URL = 'http://localhost:4000';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(API_URL+'/users',{headers});
    }

    getById(id: number) {
        return this.http.get('/users/' + id);
    }

    register(user: User) {
        return this.http.post(API_URL + '/users/register', user);
    }

    update(user: User) {
        return this.http.put('/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/users/' + id);
    }

    /**
     * rest api to check user availability 
     */
    checkUserAvailability(userName: string)
    {
        return this.http.post(API_URL + '/users/checkAvailability',{username: userName});
    }

}