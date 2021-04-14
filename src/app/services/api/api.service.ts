import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Simulator} from './simulator.model';
import {Observable, throwError} from 'rxjs';
import {pathValues} from '../../utils/path-values';
import {catchError, retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient)  {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getSimulator(): Observable<Simulator> {
 /*   let params = new HttpParams();
    params = params.append('fechaInicio', fechaInicio.toISOString());
    params = params.append('fechaFin', fechaFin.toISOString());*/

    return this.http.get<Simulator>(pathValues.apiValue + '/', {})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  postSimulator(payload: HttpParams): Observable<any> {
    /*   let params = new HttpParams();
       params = params.append('fechaInicio', fechaInicio.toISOString());
       params = params.append('fechaFin', fechaFin.toISOString());*/

    return this.http.post<any>(pathValues.apiValue + '/', payload)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
