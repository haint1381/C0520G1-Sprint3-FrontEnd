import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {
  private API_REQUEST = 'http://localhost:8080/request';
  // private formBill = new Subject();
  // currentForm = this.formBill.asObservable();
  constructor(
    private http: HttpClient
  ) {
  }

  getListService(): Observable<any> {
    return this.http.get(this.API_REQUEST + '/service');
  }

  creatBillPaymentDirect(bill): Observable<any> {
    return this.http.post(this.API_REQUEST + '/payment-direct', bill);
  }

  createBillPaymentByAccount(bill): Observable<any> {
    return this.http.post(this.API_REQUEST + '/payment-by-account', bill);
  }

  // tslint:disable-next-line:typedef
  // senDataComponent(formBill) {
  //   this.formBill.next(formBill);
  // }
  getListBill(): Observable<any> {
    return this.http.get(this.API_REQUEST + '/listBill');
  }

  getBillByIdBill(idBill): Observable<any> {
    return this.http.get(this.API_REQUEST + '/listBill/' + idBill);
  }

  setStatusBill(idBill): Observable<any> {
    return this.http.put(this.API_REQUEST + '/listBill/setStatus/' + idBill, idBill);
  }
}
