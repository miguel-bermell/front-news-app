import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { distinctUntilChanged, filter } from 'rxjs'
import { ErrorResponse, News } from '../interfaces'
import { NotifyService } from '../services/notify.service'
import { DataService } from './services/data.service'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly dataService: DataService,
    private readonly notifyService: NotifyService,
    private readonly router: Router
  ) { }

  public news: News | null = null
  public loading: boolean = false

  ngOnInit (): void {
    this.activatedRoute.params.pipe(
      filter(params => params['id']), distinctUntilChanged()
    ).subscribe(({ id }) => this.getNews(id))
  }

  getNews (id: string): void {
    this.loading = true

    this.dataService.getNews(id).subscribe({
      next: results => {
        this.news = results.data
        console.log(this.news)
        this.loading = false
      },
      error: (err: ErrorResponse) => {
        console.error(err)
        this.loading = false
        this.notifyService.error(err.message)
        void this.router.navigate(['/'])
      }
    })
  }
}
