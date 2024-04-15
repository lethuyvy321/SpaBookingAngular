import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private userStore: UserStoreService,

  ) {}
  public fullName: string = '';
  public role : string = '';
  public logout() {
    this.dataService.logout();
  }
  public ngOnInit(): void {
    console.log('toi dag o home')
    this.userStore.getFullNameFromStore().subscribe((data) => {
      const fullNameFromToken = this.dataService.getfullNameFromToken();
      this.fullName = data || fullNameFromToken;
    });
    this.userStore.getRoleFromStore().subscribe((data) => {
      const roleFromToken = this.dataService.getRoleFromToken();
      this.role = data || roleFromToken;
    })
    
  }
}
