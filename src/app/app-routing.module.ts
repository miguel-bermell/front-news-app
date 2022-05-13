import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', loadChildren: async () => await import('./home/home.module').then(m => m.HomeModule) },
  { path: 'noticia/:id', loadChildren: async () => await import('./news/news.module').then(m => m.NewsModule) },
  { path: 'archivo', loadChildren: async () => await import('./archived/archived.module').then(m => m.ArchivedModule) },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
