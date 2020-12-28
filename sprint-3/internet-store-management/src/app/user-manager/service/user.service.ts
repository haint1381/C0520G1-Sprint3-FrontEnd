import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API = 'http://localhost:8080/user';

  constructor(
    public http: HttpClient
  ) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  getByID(idUser): Observable<any> {
    console.log(idUser);
    return this.http.get<any>(this.API + '/getUser/' + idUser);
  }

  create(user): Observable<any> {
    console.log('service' + user);
    return this.http.post(this.API + '/create', user);
  }

  edit(user, idUser): Observable<any> {
    return this.http.patch<any>(this.API + '/edit/' + idUser, user);
  }

  delete(userId): Observable<any> {
    return this.http.delete(this.API + '/delete/' + userId);
  }
}
