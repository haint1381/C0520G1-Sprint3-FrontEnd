import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerListComponent } from './component/computer-list/computer-list.component';
import {RouterModule} from '@angular/router';
import {ComputerRoutes} from './computer-manager-routing.modules';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [ComputerListComponent],
    exports: [
        ComputerListComponent
    ],
    imports: [
        CommonModule,
        Ng2SmartTableModule,
        RouterModule.forChild(ComputerRoutes),
        NgxPaginationModule,
        ReactiveFormsModule
    ]
})
export class ComputerManagerModule { }
