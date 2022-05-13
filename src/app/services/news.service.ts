
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { ApiResponse, ErrorResponse, News } from 'src/app/interfaces'
import { firstValueFrom, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor (private readonly http: HttpClient) { }

  async getNewsNotArchived (): Promise<ApiResponse<News[]>> {
    return await new Promise((resolve) => {
      const response = this.http.get<ApiResponse<News[]>>(`${environment.apiUrl}/news/not-archived`)
      firstValueFrom(response)
        .then((response) => resolve(response))
        .catch((error: HttpErrorResponse) => resolve(error.error))
    })
  }

  getNewsArchived (): Observable<ApiResponse<News[]>> {
    return new Observable((observer) => {
      this.http.get<ApiResponse<News[]>>(`${environment.apiUrl}/news/archive`)
        .subscribe({
          next: response => observer.next(response),
          error: (error: HttpErrorResponse) => observer.error(error.error as ErrorResponse)
        })
    })
  }

  async archiveNews (id: string): Promise<ApiResponse<News>> {
    return await new Promise((resolve) => {
      const response = this.http.post<ApiResponse<News>>(`${environment.apiUrl}/news/archive/${id}`, {})
      firstValueFrom(response)
        .then((response) => resolve(response))
        .catch((error: HttpErrorResponse) => resolve(error.error))
    })
  }

  createNews (news: FormData): Observable<ApiResponse<News>> {
    return new Observable((observer) => {
      this.http.post<ApiResponse<News>>(`${environment.apiUrl}/news`, news)
        .subscribe({
          next: response => observer.next(response),
          error: (error: HttpErrorResponse) => observer.error(error.error as ErrorResponse)
        })
    })
  }

  async deleteNews (id: string): Promise<ApiResponse<null>> {
    return await new Promise((resolve) => {
      const response = this.http.delete<ApiResponse<null>>(`${environment.apiUrl}/news/${id}`)
      firstValueFrom(response)
        .then((response) => resolve(response))
        .catch((error: HttpErrorResponse) => resolve(error.error))
    })
  }
}
