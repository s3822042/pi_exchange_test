import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Giphy} from "./giphy";

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private apiKey = import.meta.env.NG_APP_GIPHY_API_KEY;
  private apiUrl = import.meta.env.NG_APP_GIPHY_API_URL;
  private trendingEndpoint = '/trending';
  private searchEndpoint = '/search';

  constructor(private http: HttpClient) {
  }

  getTrendingGifs(): Observable<Giphy> {
    const url = `${this.apiUrl}${this.trendingEndpoint}?api_key=${this.apiKey}`;
    return this.http.get<Giphy>(url).pipe(
      catchError((error) => {
        console.error('Error fetching trending GIFs:', error);
        return throwError(() => error);
      })
    );
  }

  searchGifs(query: string): Observable<Giphy> {
    const url = `${this.apiUrl}${this.searchEndpoint}?api_key=${this.apiKey}&q=${query}`;
    return this.http.get<Giphy>(url).pipe(
      catchError((error) => {
        console.error('Error searching GIFs:', error);
        return throwError(() => error);
      })
    );
  }

}
