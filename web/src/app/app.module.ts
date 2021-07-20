import { PetshopModule } from './pages/petshop/petshop.module';
import { RoleGuard } from './auth/role.guard';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './shared/header/header.component';
import { ButtonComponent } from './components/boss-button/boss-button.component';
import { SnackService } from './components/boss-snack/snack.service';
import { SnackComponent } from './components/boss-snack/boss-snack.component';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AppMaterialModule } from './modules/material.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { InterceptorService } from './resources/http.interceptors';
import { getPortuguesePaginatorIntl } from './shared/portuguese-paginator-intl';
import { ThemePickerComponent } from './shared/theme-picker/theme-picker.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { UserComponent } from './pages/user/user.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { PostsComponent } from './pages/posts/posts.component';
import { PostFormComponent } from './pages/posts/post-form/post-form.component';
import { PostComponent } from './pages/posts/post/post.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PreviewComponent } from './pages/posts/post-form/preview/preview.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ThemePickerComponent,
    SnackComponent,
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    ConfirmDialogComponent,
    UserComponent,
    UserFormComponent,
    PostComponent,
    PostFormComponent,
    PostsComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    MatCarouselModule.forRoot(),
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgProgressModule,
    NgProgressRouterModule,
    NgProgressHttpModule,
    PetshopModule,
    SocialLoginModule,
    MaterialFileInputModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    SnackService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('669266665024-i6i9a9b8qncvpe31g9irikbfrsj88mu8.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('318197826484815')
          }
        ]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
