import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleComponent } from './role/role.component';
import { authGuard } from '../guards/auth-guard.guard';
import { TypeServiceComponent } from './type-service/type-service.component';
import { ServiceComponent } from './service/service.component';
import { ClientComponent } from './client/client.component';
import { DataService } from '../service/data.service';
const routes: Routes = [
    {path: 'staff', component: StaffComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate : [authGuard] },
    {path: 'role', component: RoleComponent},
    {path: 'typeservice', component: TypeServiceComponent},
    {path: 'service', component: ServiceComponent},
    {path: 'client', component: ClientComponent},

]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }