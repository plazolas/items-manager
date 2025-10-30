import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResBody} from '../model/res-body';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private URL = environment.backEndUrl + environment.contactUri;
  
  constructor(private http: HttpClient) { }

  public addContact(name: string, email: string, phone: string): Observable<ResBody> {
    const headers = new HttpHeaders({});
    const options = { headers };
    const contact: string = '{' +
          '\"id\": 0,' +
          '\"name\": \"' + name + '\",' +
          '\"email\": \"' + email + '\",' +
          '\"phone\": \"' + phone + '\",' +
          '\"age\": 0 }'

    return this.http.post<ResBody>( this.URL, contact, options);
  }
}
