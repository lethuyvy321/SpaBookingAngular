import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PriceComponent } from './price/price.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    AppointmentComponent,
    PriceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
