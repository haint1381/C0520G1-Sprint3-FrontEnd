import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestServiceComponent} from './component/request-service/request-service.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessageNotificationComponent } from './component/message-notification/message-notification.component';
import { PaymentServiceComponent } from './component/payment-service/payment-service.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PaymentDetailComponent } from './component/payment-detail/payment-detail.component';


@NgModule({
  declarations: [RequestServiceComponent, MessageNotificationComponent, PaymentServiceComponent, PaymentDetailComponent],
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
