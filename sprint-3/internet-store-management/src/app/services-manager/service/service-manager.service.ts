import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagerService {
  public API_SERVICE = 'http://localhost:8080/service';
  constructor(
    public http: HttpClient
  ) {}

  getAllService(): Observable<any> {
    return this.http.get(this.API_SERVICE);
  }
}
