import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiResponse, ErrorResponse, News } from '../interfaces'
import { NotifyService } from '../services/notify.service'
import { NewsService } from '../services/news.service'
import { FormArray } from '@angular/forms'
import { Observable, Subject, takeUntil, from, concatMap, takeLast } from 'rxjs'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  constructor (
    private readonly newsService: NewsService,
    private readonly notifyService: NotifyService
  ) { }

  public loading: boolean = false
  public loadingForm: boolean = false
  public news: News[] | null = null
  public formSubmitted: boolean = false
  public newsForm: FormArray = new FormArray([])

  private readonly onDestroy$: Subject<boolean> = new Subject<boolean>()

  ngOnInit (): void {
    void this.getNews()
  }

  ngOnDestroy (): void {
    this.onDestroy$.next(true)
    this.onDestroy$.complete()
  }

  async getNews (): Promise<void> {
    this.loading = true
    const { data, message, success } = await this.newsService.getNewsNotArchived()
    this.loading = false

    if (!success) {
      this.notifyService.error(message)
      return
    }

    this.news = data
  }

  async archiveNews (id: string): Promise<void> {
    this.loading = true
    const { message, success } = await this.newsService.archiveNews(id)
    this.loading = false

    if (!success) {
      this.notifyService.error(message)
      return
    }

    this.notifyService.success(message)

    await this.getNews()
  }

  onSubmit (): void {
    this.formSubmitted = true

    if (!this.newsForm.valid) {
      this.notifyService.error('Completa los campos requeridos')
      return
    }

    const formDataArrays: FormData[] = this.newsForm.value.map(({ title, content, image, author, description }: News) => {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('image', image as unknown as File)
      formData.append('author', author)
      formData.append('description', description)
      return formData
    })

    this.addNews(formDataArrays)
  }

  addNews (news: FormData[]): void {
    this.loadingForm = true

    const createNews$: Observable<ApiResponse<News>> = from(news)
      .pipe(
        concatMap(formData => this.newsService.createNews(formData)),
        takeUntil(this.onDestroy$)
      )

    createNews$.pipe(takeLast(1))
      .subscribe({
        next: ({ message }) => {
          this.notifyService.success(message)
          this.loadingForm = false
          this.formSubmitted = false
          this.newsForm.clear()
          void this.getNews()
        },
        error: ({ error }: {error: ErrorResponse}) => {
          this.notifyService.error(error.message)
          this.loadingForm = false
        }
      })
  }
}
