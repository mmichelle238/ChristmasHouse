import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  rootURL = '/api';
  
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.rootURL}/users`, user);
  }

  checkIn(email: String): Observable<String>{
    return this.http.post<String>(`${this.rootURL}/usercheckin/${email}`, null);
  }

  findUser(name: String): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(
      `${this.rootURL}/users/${name}`, { observe: 'response' });
  }

  updateUser(oldemail: String, user: User): Observable<User> {
    return this.http.put<User>(`${this.rootURL}/users/${oldemail}`, user)
  }

}
