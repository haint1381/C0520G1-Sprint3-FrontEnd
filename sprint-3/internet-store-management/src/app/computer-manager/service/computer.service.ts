import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  public API = 'http://localhost:8080/computer';
  public API_ADD = 'http://localhost:8080/computer/create';
  constructor(public http: HttpClient,
  ) { }
  getAllComputer(): Observable<any> {
    return this.http.get(this.API + '/list');
  }
  // addNewComputer(computer): Observable<any> {
  //   console.log('hhhhhhhhhh');
  //   console.log(computer);
  //   return this.http.post(this.API_ADD, computer);
  // }
  editComputer(idComputer, computer): Observable<any> {
    return this.http.put(this.API + '/edit/' + idComputer, computer);
  }
  addNewComputer(computer): Observable<any> {
    console.log('service');
    console.log(computer);
    return this.http.post(this.API + '/create', computer);
  }
}
