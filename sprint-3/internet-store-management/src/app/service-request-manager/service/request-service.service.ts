import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {
  private API_REQUEST = 'http://localhost:8080/request';
  constructor(
    private http: HttpClient
  ) {
  }
  getListService(): Observable<any> {
    return this.http.get(this.API_REQUEST + '/service');
  }
  getTypeService(): Observable<any> {
    return this.http.get('http://localhost:8080/request/type-service');
  }
  getMoneyUser(idUser: number): Observable<any> {
    return this.http.get(this.API_REQUEST + '/userList/' + idUser);
  }
}
