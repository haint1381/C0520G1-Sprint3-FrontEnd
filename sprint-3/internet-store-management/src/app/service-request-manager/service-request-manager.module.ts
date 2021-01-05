import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestServiceComponent} from './component/request-service/request-service.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageNotificationComponent} from './component/message-notification/message-notification.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {PaymentDetailComponent} from './component/payment-detail/payment-detail.component';
import { DepositAccountComponent } from './component/deposit-account/deposit-account.component';
import { MessageSuccessComponent } from './component/message-success/message-success.component';


@NgModule({
  declarations: [
    RequestServiceComponent,
    MessageNotificationComponent,
    PaymentDetailComponent,
    DepositAccountComponent,
    MessageSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxPaginationModule
  ]
})
export class ServiceRequestManagerModule {
}
