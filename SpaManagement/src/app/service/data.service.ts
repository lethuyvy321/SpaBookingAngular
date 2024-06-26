import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Client } from '../models/client';
import { Role } from '../models/role';
import { Staff } from '../models/staff';
import { TypeService } from '../models/typeService';
import { Service } from '../models/service';
import { Booking } from '../models/booking';
import { BookingDetail } from '../models/bookingDetail';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  public newclient: Client = {
    id: '',
    FullName: '',
    UserName: '',
    Password: '',
    SDT: '',
    Email: '',
    Birthday: new Date(),
    created: new Date(),
    updated: new Date(),
    isDeleted: false,
  };

  public newrole: Role = {
    id: '',
    Name: '',
    created: new Date(),
    updated: new Date(),
    isDeleted: false,
  }

  public newstaff: Staff = {
    _id: '',
    FullName: '',
    UserName: '',
    Password: '',
    data: '',
    Email: '',
    RoleID: '',
    CCCD: '',
    Address: '',
    created: new Date(),
    updated: new Date(),
    isDeleted: false,
  }

  public newtypeservice: TypeService = {
    id: '',
    Name: '',
    created: new Date(),
    updated: new Date(),
    isDeleted: false,
  }

  public newservice: Service = {
    id: '',
    Name: '',
    TypeID: '',
    Description: '',
    Price: 0,
    created: new Date(),
    updated: new Date(),
    isDelete: false,
  }

  public newbooking: Booking = {
    id: '',
    ClientID: '',
    FullName: '',
    Date: new Date(),
    Time: '',
  }

  public newdetail: BookingDetail = {
    BookingID: '',
    ServiceID: '',
    Price: 0,
  }
  private userPayload: any;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
  }
  public login(payload: Staff): Observable<Staff> {
    const url = `${this.REST_API_SERVER}/authstaff/login`;
    return this.httpClient.post<Staff>(url, payload, this.httpOptions);
  }
  public me(): Observable<any> {
    const url = `${this.REST_API_SERVER}/authstaff/me`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public register(payload: Staff): Observable<Staff> {
    const url = `${this.REST_API_SERVER}/authstaff/register`;
    return this.httpClient.post<Staff>(url, payload, this.httpOptions);
  }
  public sendmail(payload: Staff): Observable<Staff> {
    const url = `${this.REST_API_SERVER}/authstaff/forgotPassword`;
    return this.httpClient.post<Staff>(url, payload, this.httpOptions);
  } 
  public resetPassword(payload: Staff,token :string): Observable<Staff> {
    const url = `${this.REST_API_SERVER}/authstaff/ResetPassword/${token}`;
    return this.httpClient.post<Staff>(url, payload, this.httpOptions);
  }
  public logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  public storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  public getToken() {
    return localStorage.getItem('token');
  }
  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  // CLIENT
  public newClient(): Client {
    return this.newclient;
  }
  public getAllClient(): Observable<any> {
    const url = `${this.REST_API_SERVER}/clients`;
    return this.httpClient.get<Client[]>(url);
  }
  public putClient(payload: Client): Observable<Client> {
    const url = `${this.REST_API_SERVER}/clients/${payload.id}`;
    return this.httpClient.put<Client>(url, payload, this.httpOptions);
  }
  public getClientById(ClientID: string): Observable<Client> {
    const url = `${this.REST_API_SERVER}/clients/${ClientID}`;
    return this.httpClient.get<Client>(url, this.httpOptions);
  }

  //ROLE
  public newRole(): Role {
    return this.newrole;
  }
  public getAllRole(): Observable<any> {
    const url = `${this.REST_API_SERVER}/roles`;
    return this.httpClient.get<Role[]>(url);
  }
  public postRole(payload: Role): Observable<Role> {
    const url = `${this.REST_API_SERVER}/roles`;
    return this.httpClient.post<Role>(url, payload, this.httpOptions);
  }
  public putRole(payload: Role): Observable<Role> {
    const url = `${this.REST_API_SERVER}/roles/${payload.id}`;
    return this.httpClient.put<Role>(url, payload, this.httpOptions);
  }
  public getRoleById(RoleID: string): Observable<Role> {
    const url = `${this.REST_API_SERVER}/roles/${RoleID}`;
    return this.httpClient.get<Role>(url, this.httpOptions);
  }

  //STAFF
  public newStaff(): Staff {
    return this.newstaff;
  }
  public getAllStaff(): Observable<any> {
    const url = `${this.REST_API_SERVER}/staffs`;
    return this.httpClient.get<Staff[]>(url);
  }
  public postStaff(payload: Staff): Observable<Staff> {
    const url = `${this.REST_API_SERVER}/staffs`;
    return this.httpClient.post<Staff>(url, payload, this.httpOptions);
  }
  public putStaff(payload: Staff): Observable<Staff> {
    const url = `${this.REST_API_SERVER}/staffs/${payload._id}`;
    return this.httpClient.put<Staff>(url, payload, this.httpOptions);
  }
  public getStaffById(StaffID: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/staffs/${StaffID}`;
    return this.httpClient.get<Staff>(url, this.httpOptions);
  }

  //SERVICE
  public newService(): Service {
    return this.newservice;
  }
  public getAllService(): Observable<any> {
    const url = `${this.REST_API_SERVER}/services`;
    return this.httpClient.get<Service[]>(url);
  }
  public postService(payload: Service): Observable<Service> {
    const url = `${this.REST_API_SERVER}/services`;
    return this.httpClient.post<Service>(url, payload, this.httpOptions);
  }
  public putService(payload: Service): Observable<Service> {
    const url = `${this.REST_API_SERVER}/services/${payload.id}`;
    return this.httpClient.put<Service>(url, payload, this.httpOptions);
  }
  public getServiceById(ServiceID: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/services/${ServiceID}`;
    return this.httpClient.get<Service>(url, this.httpOptions);
  }

  //SERVICETYPE
  public newTypeService(): TypeService {
    return this.newtypeservice;
  }
  public getAllTypeservice(): Observable<any> {
    const url = `${this.REST_API_SERVER}/typeservices`;
    return this.httpClient.get<any>(url);
  }
  public postTypeservice(payload: TypeService): Observable<TypeService> {
    const url = `${this.REST_API_SERVER}/typeservices`;
    return this.httpClient.post<TypeService>(url, payload, this.httpOptions);
  }
  public putTypeservice(payload: TypeService): Observable<TypeService> {
    const url = `${this.REST_API_SERVER}/typeservices`;
    return this.httpClient.put<TypeService>(url, payload, this.httpOptions);
  }
  public getTypeserviceById(TypeserviceID: string): Observable<TypeService> {
    const url = `${this.REST_API_SERVER}/typeservices/id?id=${TypeserviceID}`;
    return this.httpClient.get<TypeService>(url, this.httpOptions);
  }

  // Booking
  public newBooking(): Booking {
    return this.newbooking;
  }
  public getAllBooking(): Observable<any> {
    const url = `${this.REST_API_SERVER}/bookings`;
    return this.httpClient.get<Booking[]>(url);
  }
  public postBooking(payload: Booking): Observable<Booking> {
    const url = `${this.REST_API_SERVER}/booking`;
    return this.httpClient.post<Booking>(url, payload, this.httpOptions);
  }
  public putBooking(payload: Booking): Observable<Booking> {
    const url = `${this.REST_API_SERVER}/booking`;
    return this.httpClient.put<Booking>(url, payload, this.httpOptions);
  }
  public getBookingById(BookingID: string): Observable<Booking> {
    const url = `${this.REST_API_SERVER}/Booking/BookingID?BookingID=${BookingID}`;
    return this.httpClient.get<Booking>(url, this.httpOptions);
  }

  // Bookingdetail
  public newBookingDetail(): BookingDetail {
    return this.newdetail;
  }
  public getAllBookingdetail(): Observable<BookingDetail[]> {
    const url = `${this.REST_API_SERVER}/bookingdetails`;
    return this.httpClient.get<BookingDetail[]>(url);
  }
  public getDetailByBookingID(bookingId: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/bookingdetails/${bookingId}`;
    return this.httpClient.get<BookingDetail>(url, this.httpOptions);
  }
  public decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }
  public getfullNameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }
  public getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
}
