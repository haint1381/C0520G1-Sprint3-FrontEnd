import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerListComponent } from './component/computer-list/computer-list.component';
import {RouterModule} from '@angular/router';
import {ComputerRoutes} from './computer-manager-routing.modules';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {ComputerDeleteComponent} from './component/computer-delete/computer-delete.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormDirective} from './formDirective';

@NgModule({
    declarations: [ComputerListComponent,
      ComputerDeleteComponent,
      FormDirective
    ],
    exports: [
        ComputerListComponent
    ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    RouterModule.forChild(ComputerRoutes),
    NgxPaginationModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class ComputerManagerModule { }
