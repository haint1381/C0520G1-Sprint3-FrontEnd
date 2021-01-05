import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagerService {
  public API_SERVICE = 'http://localhost:8080/service';
  public API_ADD_SERVICE = 'http://localhost:8080/service/create';
  public API_UPDATE_SERVICE = 'http://localhost:8080/service/edit';
  public API_DELETE_SERVICE = 'http://localhost:8080/service/delete';
  public API_FIND_BY_ID_SERVICE = 'http://localhost:8080/service/findById';
  public API_TYPE_SERVICE = 'http://localhost:8080/typeService';

  constructor(
    public http: HttpClient
  ) {
  }

  getAllService(): Observable<any> {
    return this.http.get(this.API_SERVICE);
  }

  addNewService(service): Observable<any> {
    return this.http.post(this.API_ADD_SERVICE, service);
  }

  updateService(idService, service): Observable<any> {
    return this.http.put(this.API_UPDATE_SERVICE + '/' + idService, service);
  }

  deleteService(idService): Observable<any> {
    return this.http.delete(this.API_DELETE_SERVICE + '/' + idService);
  }
  getServiceById(idService): Observable<any> {
    return this.http.get(this.API_FIND_BY_ID_SERVICE + '/' + idService);
  }

  getAllTypeService(): Observable<any> {
    return this.http.get(this.API_TYPE_SERVICE);
  }
}
