import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';

import { AuthInterceptor } from '@app/core/interceptors/auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideToastr } from 'ngx-toastr';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { Page404Component } from './components/page404/page404.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedModule } from './shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SplashScreenComponent,
    HeaderComponent,
    DashboardLayoutComponent,
    Page404Component,
    UserCardComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    SharedModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
