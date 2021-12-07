import { Component, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-button',
  template: `<button (click)="onClick.emit('hi')">Click me</button>`,
})
export default class ButtonComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter()
}
