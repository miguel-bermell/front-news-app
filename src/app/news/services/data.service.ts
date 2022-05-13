import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiResponse, ErrorResponse, News } from 'src/app/interfaces'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor (private readonly http: HttpClient) { }

  getNews (id: string): Observable<ApiResponse<News>> {
    return new Observable((observer) => {
      this.http.get<ApiResponse<News>>(`${environment.apiUrl}/news/${id}`)
        .subscribe({
          next: response => observer.next(response),
          error: (error: HttpErrorResponse) => observer.error(error.error as ErrorResponse)
        })
    })
  }
}
