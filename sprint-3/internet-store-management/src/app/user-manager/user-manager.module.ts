import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserCreateComponent } from './component/user-create/user-create.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { UserEditComponent } from './component/user-edit/user-edit.component';
import { UserDeleteComponent } from './component/user-delete/user-delete.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [UserListComponent, UserCreateComponent, UserDetailComponent, UserEditComponent, UserDeleteComponent],
  exports: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    HttpClientModule,
    MatDialogModule
  ]
})
export class UserManagerModule { }
