import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonRoute} from './page-routing.module';
import {HeaderComponent} from './component/header/header.component';
import {HomePageComponent} from './component/home-page/home-page.component';
import {FooterComponent} from './component/footer/footer.component';
import {MessageComponent} from './component/message/message.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { MyGameComponent } from './component/my-game/my-game.component';
import {ErrorPageComponent} from './component/error-page/error-page.component';
import { MessageTimeComponent } from './component/message-time/message-time.component';

@NgModule({
  declarations: [MyGameComponent , HeaderComponent, HomePageComponent, FooterComponent, MessageComponent, ResetPasswordComponent, ErrorPageComponent, MessageTimeComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(CommonRoute),
        FormsModule,
        SocialLoginModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [{
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('375466110415778'),
      },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('103585693874-0bjkl21cmmjf8d9n09io95ciuveiievl.apps.googleusercontent.com'),
        },
      ],
    } as SocialAuthServiceConfig,
  }],
})
export class PageCommonModule {
}
