import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ComputerManagerModule} from './computer-manager/computer-manager.module';
import {PageCommonModule} from './page-common/page-common.module';
import {PayManagerModule} from './pay-manager/pay-manager.module';
import {ServiceRequestManagerModule} from './service-request-manager/service-request-manager.module';
import {ServicesManagerModule} from './services-manager/services-manager.module';
import {UserManagerModule} from './user-manager/user-manager.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComputerManagerModule,
    PageCommonModule,
    PayManagerModule,
    ServiceRequestManagerModule,
    ServicesManagerModule,
    UserManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
