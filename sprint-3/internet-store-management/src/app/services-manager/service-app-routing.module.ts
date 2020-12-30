import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceManagerComponent } from './service-manager/service-manager.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SmartTableModule} from 'ng2-smart-table';

const routes: Routes = [
  {
    path: 'list-service', component: ServiceManagerComponent
  }
];

@NgModule({
  declarations: [ServiceManagerComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxPaginationModule,
        Ng2SmartTableModule,
    ]
})
export class ServiceAppRoutingModule { }
