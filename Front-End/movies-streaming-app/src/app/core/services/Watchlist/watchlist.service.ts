import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { VideoType } from '../../dtos/VideoType';
import { environment } from '../../environments/environment';
import { MediaItem } from '../../dtos/MediaItemDto';
import { AccountService } from '../Account/account.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  constructor(private http: HttpClient, private accountService: AccountService) {}

  private getHeaders(): HttpHeaders {
    const token = this.accountService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Add to watchlist
  addToWatchlist(body: MediaItem): Observable<boolean> {
    const token = this.accountService.getToken();
    if (!token) {
      return of(false);
    }

    const url = `${environment.account_base_url}/api/lists/watchlist`;
    return this.http.post(url, body, { headers: this.getHeaders() }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  // Delete from watchlist
  deleteFromWatchlist(body: MediaItem): Observable<boolean> {
    const token = this.accountService.getToken();
    if (!token) {
      return of(false);
    }

    const url = `${environment.account_base_url}/api/lists/watchlist`;
    return this.http.delete(url, { 
      body,
      headers: this.getHeaders()
    }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  // Get watchlist
  getWatchlist(): Observable<MediaItem[]> {
    const token = this.accountService.getToken();
    if (!token) {
      return throwError(() => new Error('User not authenticated'));
    }
  
    const url = `${environment.account_base_url}/api/lists/watchlist`;
    return this.http.get<MediaItem[]>(url, { headers: this.getHeaders() }).pipe(
      catchError(() => throwError(() => new Error('Failed to load watchlist')))
    );
  }  
}
