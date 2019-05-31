import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SermonsService {
  apiUrl = "https://mobile.ob1church.com/api/v1";

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  /**
   * Get the detailed information for an ID using the "i" parameter
   *
   * @param {string} id sermonId to retrieve information
   * @returns Observable with detailed information
   */
  getOne(id: string) {
    return this.http.get(`${this.apiUrl}/series/${id}`);
  }

  /**
   * Get data from the Api
   * map the result to return only the results that we need
   *
   * @returns Observable with the search results
   */
  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/series`).pipe(map(results => results));
  }

  /**
   * Get the detailed information for an ID using the "i" parameter
   *
   * @param {string} id sermonId to retrieve information
   * @returns Observable with detailed information
   */
  getSermon(id: string) {
    return this.http.get(`${this.apiUrl}/sermons/${id}`);
  }

  /**
   * Get the latest serie details
   *
   * @returns Observable with detailed information
   */
  lastSerie() {
    return this.getAll().subscribe(series => series[0]);
  }
}
