import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  public API = 'http://localhost:8080/computer';
  constructor(public http: HttpClient) { }
  getAllComputer(): Observable<any> {
    return this.http.get(this.API + '/list');
  }
}
