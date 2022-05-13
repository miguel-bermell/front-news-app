import { Component, Input, OnInit } from '@angular/core'
import { News } from 'src/app/interfaces'

@Component({
  selector: 'app-readmore',
  templateUrl: './readmore.component.html',
  styleUrls: ['./readmore.component.scss']
})
export class ReadmoreComponent implements OnInit {
  @Input() news!: News

  ngOnInit (): void {
  }
}
