import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestServiceComponent } from './component/request-service/request-service.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [RequestServiceComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule
  ]
})
export class ServiceRequestManagerModule { }
