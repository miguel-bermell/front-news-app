import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Button, News } from 'src/app/interfaces'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() news: News[] = []

  @Input() button: Button = {
    text: 'Archivar',
    classColor: 'btn-secondary'
  }

  @Input() loading: boolean = false

  @Output() onClick = new EventEmitter<string>()

  public itemSelected: string | null = null

  onClickButton (event: Event, itemId: string): void {
    this.itemSelected = itemId

    event.stopPropagation()
    event.preventDefault()

    this.onClick.emit(itemId)
  }
}
