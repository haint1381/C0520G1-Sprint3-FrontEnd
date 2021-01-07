import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NgZone} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ComputerManagerModule} from './computer-manager/computer-manager.module';
import {PageCommonModule} from './page-common/page-common.module';
import {PayManagerModule} from './pay-manager/pay-manager.module';
import {ServiceRequestManagerModule} from './service-request-manager/service-request-manager.module';
import {ServicesManagerModule} from './services-manager/services-manager.module';
import {UserManagerModule} from './user-manager/user-manager.module';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule } from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComputerManagerModule,
    PageCommonModule,
    PayManagerModule,
    ServiceRequestManagerModule,
    ServicesManagerModule,
    UserManagerModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({timeOut: 2000, positionClass : 'toast-top-center', preventDuplicates: true}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
