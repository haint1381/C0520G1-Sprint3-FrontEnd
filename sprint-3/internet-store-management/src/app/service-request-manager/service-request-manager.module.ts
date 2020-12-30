import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestServiceComponent } from './component/request-service/request-service.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [RequestServiceComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ServiceRequestManagerModule { }
