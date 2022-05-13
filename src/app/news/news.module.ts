import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NewsRoutingModule } from './news-routing.module'
import { NewsComponent } from './news.component'
import { ReadmoreComponent } from './components/readmore/readmore.component'
import { DirectivesModule } from '../shared/directives/directives.module'

@NgModule({
  declarations: [
    NewsComponent,
    ReadmoreComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    DirectivesModule
  ]
})
export class NewsModule { }
