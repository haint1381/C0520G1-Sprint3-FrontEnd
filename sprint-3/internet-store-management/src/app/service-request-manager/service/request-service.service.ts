import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

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

  creatBillPaymentDirect(bill): Observable<any> {
    return this.http.post(this.API_REQUEST + '/payment-direct', bill);
  }

  creatBillPaymentPayPal(bill): Observable<any> {
    return this.http.post(this.API_REQUEST + '/payment-paypal', bill);
  }

  createBillPaymentByAccount(bill): Observable<any> {
    return this.http.post(this.API_REQUEST + '/payment-by-account', bill);
  }

  getListBill(): Observable<any> {
    return this.http.get(this.API_REQUEST + '/listBill');
  }

  getBillByIdBill(idBill): Observable<any> {
    return this.http.get(this.API_REQUEST + '/listBill/' + idBill);
  }

  setStatusBill(idBill): Observable<any> {
    return this.http.put(this.API_REQUEST + '/listBill/setStatus/' + idBill, idBill);
  }

  creatBillDeposit(bill): Observable<any> {
    return this.http.post(this.API_REQUEST + '/deposit', bill);
  }

  payDeposit(idBill): Observable<any> {
    return this.http.put(this.API_REQUEST + '/deposit/' + idBill, idBill);
  }

  buyHourOfUser(idUser: string, price: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('idUser', idUser);
    params = params.append('priceHour', price);
    return this.http.get(this.API_REQUEST + '/getBuyHours', {params});
  }
}
