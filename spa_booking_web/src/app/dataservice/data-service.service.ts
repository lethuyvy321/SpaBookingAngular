import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';
import { environment } from 'src/environmets/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { BookingDetail } from '../models/detail';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private REST_API_SERVER = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  public newbooking: Booking = {
    id: '',
    ClientID: '',
    FullName: '',
    Date: new Date(),
    Time: '',
  }
  public newclient: Client = {
    _id: '',
    FullName: '',
    UserName: '',
    Password: '',
    SDT: '',
    Email: '',
    Birthday: new Date(),
    created: new Date(),
    updated: new Date(),
    Deleted: false,
  };
  public newdetail: BookingDetail = {
    BookingID: '',
    ServiceID: '',
    Price: 0,
  }
  constructor(private httpClient: HttpClient, private router: Router) { }
    // Booking
    public newBooking(): Booking {
      return this.newbooking;
    }
    public newClient(): Client {
      return this.newclient;
    }
    public newDetail(): BookingDetail {
      return this.newdetail;
    }
    public postBooking(payload: Booking): Observable<any> {
      const url = `${this.REST_API_SERVER}/bookings`;
      return this.httpClient.post<Booking>(url, payload, this.httpOptions);
    }
    public getAllService(): Observable<any> {
      const url = `${this.REST_API_SERVER}/services`;
      return this.httpClient.get<Service[]>(url);
    }
    public postBookingdetail(payload: BookingDetail): Observable<any> {
      const url = `${this.REST_API_SERVER}/bookingdetails`;
      return this.httpClient.post<BookingDetail>(url, payload, this.httpOptions);
    }
    public getClientByPhone(Phone: string): Observable<any> {
      const url = `${this.REST_API_SERVER}/clients/${Phone}`;
      return this.httpClient.get<Client>(url, this.httpOptions);
    }
    public postClient(payload: Client): Observable<any> {
      const url = `${this.REST_API_SERVER}/clients/register`;
      return this.httpClient.post<Client>(url, payload, this.httpOptions);
    }
}
