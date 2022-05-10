import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PagesRoutingModule } from './core/pages/pages-routing.module'

const routes: Routes = [
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }