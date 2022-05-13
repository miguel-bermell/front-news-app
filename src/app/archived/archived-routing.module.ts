import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ArchivedComponent } from './archived.component'

const routes: Routes = [{ path: '', component: ArchivedComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivedRoutingModule { }
