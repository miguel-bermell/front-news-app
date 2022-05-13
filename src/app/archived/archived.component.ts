import { Component, OnInit } from '@angular/core'
import { Button, ErrorResponse, News } from '../interfaces'
import { NewsService } from '../services/news.service'
import { NotifyService } from '../services/notify.service'

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.scss']
})
export class ArchivedComponent implements OnInit {
  constructor (
    private readonly newsService: NewsService,
    private readonly notifyService: NotifyService
  ) { }

  public loading: boolean = false
  public news: News[] | null = []
  public buttonNews: Button = {
    text: 'Eliminar',
    classColor: 'btn-danger'
  }

  public noArchivedNewsMessage: string = 'No hay noticias archivadas para mostrar'

  ngOnInit (): void {
    this.getNewsArchived()
  }

  getNewsArchived (): void {
    this.loading = true
    this.newsService.getNewsArchived().subscribe({
      next: results => {
        this.loading = false
        this.news = results.data
      },
      error: (err: ErrorResponse) => {
        console.error(err)
        this.loading = false
        this.notifyService.error(err.message)
      }
    })
  }

  async deleteNews (id: string): Promise<void> {
    this.loading = true
    const { message, success } = await this.newsService.deleteNews(id)
    this.loading = false

    if (!success) {
      this.notifyService.error(message)
      return
    }

    this.notifyService.success(message)
    this.getNewsArchived()
  }
}
