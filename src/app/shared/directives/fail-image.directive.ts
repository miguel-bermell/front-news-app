import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[FailImage]'
})
export class FailImageDirective {
  constructor (private readonly elementRef: ElementRef) {}

  @HostListener('error') onError (): void {
    this.elementRef.nativeElement.src = 'assets/img/no-image.png'
  }
}
