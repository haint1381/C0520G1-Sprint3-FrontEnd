import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageDefaultComponent} from './page-common/page-default/page-default.component';
import {LoginComponent} from './page-common/login/login.component';
import { ServiceDeleteDialogComponent } from './services-manager/service-delete-dialog/service-delete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

const routes: Routes = [
  {
    path: '', component: PageDefaultComponent
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), MatDialogModule],
  exports: [RouterModule],
  declarations: [ServiceDeleteDialogComponent]
})
export class AppRoutingModule {
}
