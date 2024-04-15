import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SplitterModule } from 'primeng/splitter';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { SpeedDialModule } from 'primeng/speeddial';
import { AvatarModule } from 'primeng/avatar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin/admin-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    CheckboxModule,
    BrowserAnimationsModule,
    TableModule,
    ToolbarModule,
    FileUploadModule,
    RatingModule,
    TagModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    FormsModule,
    CardModule,
    ProgressBarModule,
    OrganizationChartModule,
    ButtonModule,
    SidebarModule,
    DropdownModule,
    RadioButtonModule,
    DividerModule,
    PasswordModule,
    SpeedDialModule,
    AvatarModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
