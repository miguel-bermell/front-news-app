import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FailImageDirective } from './fail-image.directive'

const DIRECTIVES = [
  FailImageDirective
]

@NgModule({
  declarations: DIRECTIVES,
  imports: [
    CommonModule
  ],
  exports: [
    ...DIRECTIVES
  ]
})
export class DirectivesModule { }
