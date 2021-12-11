import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-message-form',
  template: `
    <div class="flex flex-row mt-10">
      <div class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-1">
        <form (submit)="submitForm()">
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
        <div class="flex content-center">
          <span class="flex-1"></span>
          <button
            class="p-2 w-full rounded-md shadow-md md:w-64 bg-purple-400 text-white"
            type="submit"
            (click)="sendMessage.emit({message})"
          >
            Send
          </button>
          <span class="flex-1"></span>
        </div>
      </div>
    </div>
  `,
})
export default class MessageFormComponent {
  @Output() sendMessage: EventEmitter<any> = new EventEmitter()
  message: string = ''
  onKey(event: any) {
    this.message = event.target.value
  }

  submitForm() {
    this.sendMessage.emit({ message: this.message })
  }
}
