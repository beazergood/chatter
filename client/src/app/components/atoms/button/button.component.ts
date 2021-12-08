import { Component, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-button',
  template: `
    <button
      class="p-2 rounded-md shadow-md w-64 bg-blue-300"
      (click)="onClick.emit()"
    >
      Send
    </button>
  `,
})
export default class ButtonComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter()
}
