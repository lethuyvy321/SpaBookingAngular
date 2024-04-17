import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from 'src/app/models/client';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }
  public clients: Client[] = [];
  public clientDialog = false;
  public client: Client = Object.assign({}, this.dataService.newClient());
  public submitted = false;
  public ngOnInit(): void {
    this.loadClient();
  }
  public loadClient() {
    this.dataService.getAllClient().subscribe((response) => {
      if (response.success) {
        this.clients = response.data;
      } else {
        console.error('Failed to fetch categories');
      }
    });
  }
  public editClient(client: Client): void {
    console.log('edit ', client);
    this.client = client;
    this.clientDialog = true;
  }
  public deleteClient(client: Client): void {
    console.log('delete ', client);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + client.FullName + '?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        client.isDeleted = true;
        this.dataService.putClient(client).subscribe({
          next: data => {
            console.log('Xóa thành công', data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xóa thành công!', life: 3000 });
          },
          error: error => {
            console.log('Xóa không thành công', error);
          }
        })
      },
    });
  }
  public openNew(): void {
    console.log('openNew');
    this.client = Object.assign({}, this.dataService.newClient());
    this.clientDialog = true;
  }
  public hideDialog(cancel = true, success = true): void {
    this.submitted = false;
    console.log('hideDialog');
    this.clientDialog = false;
    if (cancel) {
      this.messageService.add({
        severity: 'info', summary: 'Cancel', detail: 'Thêm không thành công!', life: 3000
      });
    } else if (success) {
      this.messageService.add({
        severity: 'success', summary: 'Successful', detail: 'Thành công!', life: 3000
      });
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error', detail: 'Lỗi!', life: 3000
      });
    }
  }
  public isValidData(): boolean {
    // Kiểm tra tất cả các trường dữ liệu
    if (
      this.client.FullName &&
      this.client.UserName &&
      this.client.Email &&
      this.client.SDT &&
      this.client.Birthday
    ) {
      return true;
    }
    return false
  }
  public saveClient(): void {
    this.submitted = true;
    if (this.isValidData()) {

      if (this.client.id === '') {
        this.dataService.putClient(this.client).subscribe({
          next: response => {
            console.log('Thêm thành công ', response);
            this.loadClient();
            this.hideDialog(false, true);
          },
          error: error => {
            console.log('error', error);
            this.hideDialog(false, false);
          }
        });
      }
      else {
        console.log("Lưu", this.client);
        this.dataService.putClient(this.client).subscribe({
          next: response => {
            console.log('Cập nhật thành công ', response);
            this.loadClient();
            this.hideDialog(false, true);
          },
          error: error => {
            console.error('Lỗi khi cập nhật khách hàng:', error);
            this.hideDialog(false, false);
          }
        });

      }
    }
  }
}
