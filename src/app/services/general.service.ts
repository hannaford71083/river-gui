import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IUser, IUserCreate } from '../models/app-interfaces';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) {  }
  
  baseUrl = "http://localhost:4000";

  getUserList(): Observable<any[]> {  
    return this.http.get<any[]>(`${this.baseUrl}/users`)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  getUser(id : number): Observable<IUser> {  
    return this.http.get<IUser>( `${this.baseUrl}/users/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createUser(user : IUserCreate): Observable<any>{
    return this.http.post<IUserCreate>( `${this.baseUrl}/users`, user)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user : any): Observable<any>{
    return this.http.put<any>( `${this.baseUrl}/users/${id}`, user)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete<any>( `${this.baseUrl}/users/${id}`)
    .pipe(
      // tap(data => console.log('deleteUser: ' ,data)),
      catchError(this.handleError)
    );
  }
  
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
