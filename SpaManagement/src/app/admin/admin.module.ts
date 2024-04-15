import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule} from 'primeng/checkbox';
import { TableModule} from 'primeng/table';
import { PanelModule} from 'primeng/panel';
import { RadioButtonModule} from 'primeng/radiobutton';
import { InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessageModule} from 'primeng/message';
import { MessagesModule} from 'primeng/messages';
import { InputTextareaModule} from 'primeng/inputtextarea';
import { SplitterModule} from 'primeng/splitter';
import { CardModule} from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule} from 'primeng/inputtext';
import { MenubarModule} from 'primeng/menubar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule} from 'primeng/toolbar';
import { FileUploadModule} from 'primeng/fileupload';
import { RatingModule} from 'primeng/rating';
import { TagModule} from 'primeng/tag'
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { OrganizationChartModule} from 'primeng/organizationchart';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import { CalendarIcon } from 'primeng/icons/calendar';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { AdminRoutingModule } from './admin-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../interceptors/token-interceptor.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StaffComponent } from './staff/staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleComponent } from './role/role.component';
import { TypeServiceComponent } from './type-service/type-service.component';
import { ServiceComponent } from './service/service.component';
import { ClientComponent } from './client/client.component';



@NgModule({
  declarations: [
    StaffComponent,
    DashboardComponent,
    RoleComponent,
    TypeServiceComponent,
    ServiceComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenubarModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    CheckboxModule,
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
    CalendarModule,
    ButtonModule,
    SidebarModule,
    DropdownModule,
    ConfirmDialogModule,
    RatingModule,
    AvatarModule,
    RadioButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    MessageService,
    ConfirmationService,
  ],
})
export class AdminModule { }
