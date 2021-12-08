import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-message-form',
  template: `
    <div class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form>
        <div class="mb-4">
          <input
            class="shadow appearance-none rounded w-full py-2 px-3 border
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            type="text"
            placeholder="Message"
            (keyup)="onKey($event)"
          />
        </div>
      </form>
      <app-button (onClick)="sendMessage.emit({message})"></app-button>
    </div>
  `,
})
export default class MessageFormComponent {
  @Output() sendMessage: EventEmitter<any> = new EventEmitter()
  message: string = ''
  onKey(event: any) {
    this.message = event.target.value
  }
}
