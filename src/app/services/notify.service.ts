import { Injectable } from '@angular/core'
import { HotToastService } from '@ngneat/hot-toast'

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor (private readonly toast: HotToastService) {}

  success (message: string): void {
    this.toast.success(message, {
      position: 'top-center',
      autoClose: true,
      dismissible: true
    })
  }

  error (message: string): void {
    this.toast.error(message, {
      position: 'top-center',
      autoClose: true,
      dismissible: true,
      id: 'error'
    })
  }

  warning (message: string): void {
    this.toast.warning(message, {
      position: 'top-center',
      autoClose: true,
      dismissible: true
    })
  }

  info (message: string): void {
    this.toast.info(message, {
      position: 'top-center',
      autoClose: true,
      dismissible: true
    })
  }
}
