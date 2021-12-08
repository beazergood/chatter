import { Component, Input, Output, EventEmitter } from '@angular/core'

export interface Message {
  name: string
  time: string
  message: string
  isBroadcast?: boolean
}
/***
 * @description shows a feed of chat messages
 */
@Component({
  selector: 'app-chat',
  template: `
    <div class="flex flex-col">
      <ng-container *ngIf="messages?.length">
        <div *ngFor="let msg of messages" class="py-2 border-b border-gray-100">
          <p>
            <span class="font-semibold mr-2">{{ msg.name }}</span>
            <span class="text-gray-400">{{ msg.time }}</span>
          </p>
          <p>{{ msg.message }}</p>
        </div>
      </ng-container>
      <app-message-form
        (sendMessage)="onSendMessage.emit($event)"
      ></app-message-form>
    </div>
  `,
})
export default class ChatComponent {
  @Input() messages?: Message[]
  @Output() onSendMessage: EventEmitter<any> = new EventEmitter()
}
