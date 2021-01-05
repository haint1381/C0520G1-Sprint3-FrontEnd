import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './component/user-list/user-list.component';
import {UserCreateComponent} from './component/user-create/user-create.component';
import {UserDetailComponent} from './component/user-detail/user-detail.component';
import {UserEditComponent} from './component/user-edit/user-edit.component';
import {UserDeleteComponent} from './component/user-delete/user-delete.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {UserRoutes} from './user-routing';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MessgerUserComponent} from './component/messger-user/messger-user.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [UserListComponent, UserCreateComponent, UserDetailComponent, UserEditComponent, UserDeleteComponent, MessgerUserComponent, ChangePasswordComponent],
    exports: [
        UserListComponent,
    ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forChild(UserRoutes),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule
  ]
})
export class UserManagerModule { }
