import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account} from '../service/account';
import {OathToken} from '../model/token';
import {throwError} from 'rxjs';
import {Customer} from "../service/Customer";

@Component({
  selector: 'app-simple-http',
  templateUrl: './simple-http.component.html',
  styleUrls: ['./simple-http.component.css']
})
export class SimpleHttpComponent implements OnInit {

  data: Account[];
  accessToken: string;
  cusData: Customer[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.setAccessToken();
  }

  getSampleEnrollments() {
    this.getEnrollment();
  }

  getCustomers() {
    this.getCustomer();
  }

  getCustomer(): void{

    console.log(' GET customer method : the access token is : ' + this.accessToken);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.accessToken
      }),
      /*      setHeaders: {
              Authorization: 'Bearer ' + this.authService.currentUserValue.access_token
            }*/
    };

    this.http.get<Customer[]>('https://queen-service.azurewebsites.net/customers', httpOptions)
      .subscribe((customerList: Customer[]) => {
          console.log('POST call sussessful value returned in body', customerList);
          this.cusData = customerList;
          console.log('the POST observable is now complete. ');
        },
        response => {
          console.log('POST call in error', response);
        }
      );

  }

  // use the qa environment access token
  public setAccessToken() {
    console.log('setup things now');
    const consumerKey = 'y3WVbtLsvi9IArwGhe3M1fHjFaD40agP';
    const consumerSecret = 'MZQ2R74Y2c4kPEEp';
    const oathUrl = 'https://cust-qa-api.duke-energy.com/oauth2/v1/token';

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
    });

    const options = {headers};
    const formData = 'grant_type=client_credentials';

    this.http.post<OathToken>(oathUrl, formData, options).
    subscribe(
      res  => {
        console.log(' the access token come back from auth server is : ' + res.access_token);
        this.accessToken = res.access_token;
      },
      error => {
        throwError(error);
      }
    );
  }

  // use the txt environment url and access token.
  getEnrollment(): void {

    console.log(' GET Enrollment method : the access token is : ' + this.accessToken);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.accessToken
      }),
/*      setHeaders: {
        Authorization: 'Bearer ' + this.authService.currentUserValue.access_token
      }*/
    };

    this.http.get<Account[]>('https://cust-qa-api.duke-energy.com/kentucky/v1/enrollments', httpOptions)
      .subscribe((accountList: Account[]) => {
          console.log('POST call sussessful value returned in body', accountList);
          this.data = accountList;
          console.log('the POST observable is now complete. ');
        },
        response => {
          console.log('POST call in error', response);
        }
      );
  }

  addEnrollment(index: number): void {
    // tslint:disable-next-line:max-line-length

    console.log(' ADD method: the access token is : ' + this.accessToken);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.accessToken
      })
    };
    // tslint:disable-next-line:max-line-length
    this.http.post('https://cust-qa-api.duke-energy.com/kentucky/v1/enrollment/' + (this.data[index]).accountId, {}, httpOptions)
      .subscribe(
        (val) => {
          console.log('POST call sussessful value returned in body', val);
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('the POST observable is now complete. ');
          this.data[index].testOrControlIndicator = 'T';
          this.data[index].partBeginDate = new Date();
        }
      );
  }

  deleteEnrollment(index: number): void {

    console.log(' DELETE : the access token is : ' + this.accessToken);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.accessToken
      })
    };
    this.http.delete('https://cust-qa-api.duke-energy.com/kentucky/v1/enrollment/' + (this.data[index]).accountId, httpOptions)
      .subscribe(
        (val) => {
          console.log('delete call sussessful vaoue returned in body', val);
        },
        response => {
          console.log('DELETE call in error', response);
        },
        () => {
          console.log(' The DELETE observable is now complete. ');
          this.data[index].testOrControlIndicator = 'E';
          this.data[index].partBeginDate = null;
        }
      );
  }
}
