import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ArchivedRoutingModule } from './archived-routing.module'
import { ArchivedComponent } from './archived.component'
import { UiModule } from '../shared/ui/ui.module'

@NgModule({
  declarations: [
    ArchivedComponent
  ],
  imports: [
    CommonModule,
    ArchivedRoutingModule,
    UiModule
  ]
})
export class ArchivedModule { }
