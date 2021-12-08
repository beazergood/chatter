import { Component, Input, Output, EventEmitter } from '@angular/core'

export interface Message {
  name: string
  time: Date
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
      <ng-template #noChat>No chat</ng-template>
      <ng-container *ngIf="messages?.length; else noChat">
        <div *ngFor="let msg of messages" class="py-2 border-b border-gray-100">
          <p>
            <span class="font-semibold mr-2">{{ msg.name }}</span>
            <span class="text-gray-400">{{ msg.time | date: 'HH:mm' }}</span>
          </p>
          <p>message: {{ msg.message }}</p>
          <p>isBroadcast: {{ msg.isBroadcast }}</p>
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
