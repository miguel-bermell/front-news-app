import { Component, Input } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { NotifyService } from 'src/app/services/notify.service'

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.scss']
})
export class FormNewsComponent {
  @Input() form!: FormArray
  @Input() submitted: boolean = false

  constructor (private readonly notifyService: NotifyService) { }

  addNewsItem (): void {
    if (!this.form.valid) {
      this.notifyService.info('Debes de completar todos los campos antes de añadir una nueva noticia')
      return
    }

    const newsItem = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      image: new FormControl('')
    })

    this.form.push(newsItem)
  }

  onFileChange (event: Event): void {
    const file = (event.target as HTMLInputElement).files as FileList

    if (file.length <= 0) return

    if (file[0].type.split('/')[0] !== 'image') {
      this.notifyService.error('El archivo seleccionado no es una imagen')
      return
    }

    const fileToUpload = file[0]
    this.newsForm[this.newsForm.length - 1].get('image')?.setValue(fileToUpload)
  }

  removeNewsItem (index: number): void {
    this.form.removeAt(index)
  }

  get newsForm (): FormGroup[] {
    return this.form.controls as FormGroup[]
  }
}
