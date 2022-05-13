import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { ListComponent } from './list/list.component'
import { NoDataComponent } from './no-data/no-data.component'
import { DirectivesModule } from '../directives/directives.module'

const COMPONENTS = [
  HeaderComponent,
  ListComponent,
  NoDataComponent
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    DirectivesModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class UiModule { }
