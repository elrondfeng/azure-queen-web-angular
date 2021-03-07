import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpBackend, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppConfig {

  private config = null;
  private env = null;

  constructor(private http: HttpClient) {

  }

  public getConfig(key: any) {
    return this.config(key);
  }

  public getEnv(key: any) {
    return this.env(key);
  }

  /**
   * This method:
   *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
   *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
   */
  public load() {
    return new Promise((resolve, reject) => {

      this.http.get('config/env.json').pipe(
        catchError((error: any): any => {
          console.log(`Configuration file 'config/env.json' could not be read`);
          resolve(true);
          return error instanceof HttpErrorResponse
            ? throwError(error.message)
            : throwError(error.json().error || 'Server error');
        })
      ).
      subscribe( (envResponse) => {
        this.env = envResponse;
        let request: any = null;

        switch (this.env) {
          case 'prod': {
            request = this.http.get('config.' + this.env + '.json');
          }
                       console.log('request is : ' + request);
                       break;

          case 'qa': {
            request = this.http.get('config.' + this.env + '.json');
          }
                     console.log('request is : ' + request);
                     break;

          case 'tst': {
            request = this.http.get('config.' + this.env + '.json');
          }
                      console.log('request is : ' + request);
                      break;

          case 'dev': {
            request = this.http.get('config.' + this.env + '.json');
          }
                      console.log('request is : ' + request);
                      break;
          case 'local': {
            request = this.http.get('config.' + this.env + '.json');
          }
                        console.log('request is : ' + request);
                        break;

          case 'default': {
            console.error('Environment file is not set or invalid');
            resolve(true);
          }               break;
        }

        if (request) {
          request
            .map( res => res.json() )
            .catch((error: any) => {
              console.error('Error reading ' + this.env + ' configuration file');
              resolve(error);
              return Observable.throw(error.json().error || 'Server error');
            })
            .subscribe((responseData) => {
              this.config = responseData;
              resolve(true);
            });
        } else {
          console.error('Env config file "env.json" is not valid');
          resolve(true);
        }
      });

    });
  }
}
