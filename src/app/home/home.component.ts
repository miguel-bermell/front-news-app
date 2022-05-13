import { Component, OnInit } from '@angular/core'
import { ErrorResponse, News } from '../interfaces'
import { NotifyService } from '../services/notify.service'
import { NewsService } from '../services/news.service'
import { FormArray } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class NewsComponent implements OnInit {
  constructor (
    private readonly newsService: NewsService,
    private readonly notifyService: NotifyService
  ) { }

  public loading: boolean = false
  public loadingForm: boolean = false
  public news: News[] | null = null
  public formSubmitted: boolean = false
  public newsForm: FormArray = new FormArray([])

  ngOnInit (): void {
    void this.getNews()
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

    const formDataArrays: FormData[] = []

    this.newsForm.value.forEach(({ title, content, image, author, description }: News) => {
      formDataArrays.push(new FormData())
      formDataArrays[formDataArrays.length - 1].append('title', title)
      formDataArrays[formDataArrays.length - 1].append('content', content)
      formDataArrays[formDataArrays.length - 1].append('image', image as unknown as File)
      formDataArrays[formDataArrays.length - 1].append('author', author)
      formDataArrays[formDataArrays.length - 1].append('description', description)
    })

    this.loadingForm = true
    formDataArrays.forEach(formData => {
      this.newsService.createNews(formData).subscribe({
        next: results => {
          this.loadingForm = false
          this.formSubmitted = false
          this.newsForm.clear()
          this.notifyService.success(results.message)
          void this.getNews()
        },
        error: (err: ErrorResponse) => {
          this.loadingForm = false
          this.formSubmitted = false
          this.notifyService.error(err.message)
        }
      })
    })
  }
}
