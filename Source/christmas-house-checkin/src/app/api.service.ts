import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

const localUrl = 'http://localhost:3000/users'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(localUrl, user);
  }

  checkIn(email: String): Observable<String>{
    return this.http.post<String>(`http://localhost:3000/usercheckin/${email}`, null);
  }

  findUser(name: String): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(
      `http://localhost:3000/users/${name}`, { observe: 'response' });
  }

}
