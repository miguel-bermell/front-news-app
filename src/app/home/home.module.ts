import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { NewsComponent } from './home.component'
import { UiModule } from '../shared/ui/ui.module'
import { FormNewsComponent } from './components/form-news/form-news.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    NewsComponent,
    FormNewsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
