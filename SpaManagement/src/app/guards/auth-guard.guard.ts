import { CanActivate, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from '../service/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private dataService: DataService, private router: Router, private messageService: MessageService) {}

  canActivate(): boolean {
    if (this.dataService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.messageService.add({
        severity: 'error', summary: 'Error', detail: 'Bạn cần đăng nhập!!!', life: 3000
      });
      return false;
    }
  }
}
