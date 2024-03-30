import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { PriceComponent } from './price/price.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },  
  { path: 'service', component: ServiceComponent },
  { path: 'price', component: PriceComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'contact', component: ContactComponent },
  // { path: 'login', component: LoginComponent }
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
