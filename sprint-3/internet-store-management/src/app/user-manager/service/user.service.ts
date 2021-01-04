import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Data} from '../model/Data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API = 'http://localhost:8080/user';
  imageDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {
    url: ''
  };

  constructor(
    public http: HttpClient,
    @Inject(AngularFireDatabase) private firebase: AngularFireDatabase,
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
    return this.http.post(this.API + '/create/', user);
  }

  edit(user, idUser): Observable<any> {
    return this.http.patch<any>(this.API + '/edit/' + idUser, user);
  }

  delete(userId): Observable<any> {
    return this.http.delete(this.API + '/delete/' + userId);
  }

  searchUsers(inputSearch: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('valueSearch', inputSearch);
    return this.http.get<any>(this.API + '/inputSearch', {params});
  }

  changePassword(user, idUser): Observable<any> {
    return this.http.patch<any>(this.API + '/change-password/' + idUser, user);
  }

  getImageDetailList(): void {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails( url): void {
    this.dataSet = {
      url
    };
    this.imageDetailList.push(this.dataSet);
  }

  updateAccountImage(idUser, image): Observable<any> {
    let params = new HttpParams();
    params = params.append('idUser', idUser);
    params = params.append('image', image);
    return this.http.get(this.API + '/change-image', {params});
  }
}
