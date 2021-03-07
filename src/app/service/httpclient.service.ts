import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from './account';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) {}

  public getEnrollments() {
    console.log('test call');
    //return this.httpClient.get<Account[]>('http://localhost:8080/enrollments');

    return this.httpClient.get<Account[]>('http://https://king-service.azurewebsites.net/enrollments');

    
  }

  public getCustomers() {
    console.log('call get Customers');
    return this.httpClient.get<Account[]>('http://localhost:8080/customers');
  }
/*  public getEmployees() {
    console.log('test call');
    return this.httpClient.get<Employee[]>('http://localhost:8080/employees');
  }

  public deleteEmployee(employee) {
    return this.httpClient.delete<Employee>('http://localhost:8080/employees' + '/' + employee.empId);
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>('http://localhost:8080/employees', employee);
  }

  public calculateEV(ev) {
    return this.httpClient.post<number>('https://localhost:8080/ev', ev);
  }

  public calculateICE(ice) {
    return this.httpClient.post<number>('https://localhost:8080/ice', ice);
  }*/
}
