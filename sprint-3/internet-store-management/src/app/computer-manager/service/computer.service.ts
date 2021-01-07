import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  public API = 'http://localhost:8080/computer';
  constructor(public http: HttpClient,
  ) { }
  getAllComputer(): Observable<any> {
    return this.http.get(this.API + '/list');
  }
  deleteComputer(idComputer): Observable<any> {
    return this.http.delete(this.API + '/delete/' + idComputer);
  }
  editComputer(idComputer, computer): Observable<any> {
    return this.http.put(this.API + '/edit/' + idComputer, computer);
  }
  addNewComputer(computer): Observable<any> {
    return this.http.post(this.API + '/create', computer);
  }
  getComputerById(idComputer): Observable<any> {
    return this.http.get(this.API + '/' + idComputer);
  }
  getAllComputerStatus(): Observable<any> {
    return this.http.get(this.API + '/list/statusComputer');
  }
  search(value): Observable<any> {
    return this.http.get(this.API + '/search/' + value);
  }
}
