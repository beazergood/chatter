import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Message } from '../../data.interfaces'

/***
 * @description shows a feed of app-chat-items
 */
@Component({
  selector: 'app-chat-feed',
  template: ` <div class="flex flex-col flex-1">
    <ng-template #noChat>No chat</ng-template>
    <ng-container *ngIf="messages?.length; else noChat">
      <div
        *ngFor="let msg of messages; trackBy: identify"
        class="py-2 border-b border-gray-100"
      >
        <app-chat-item
          [msg]="msg"
          [userId]="userId"
          (onSaveEdit)="onSaveEdit.emit($event)"
          (onDeleteMessage)="onDeleteMessage.emit($event)"
        ></app-chat-item>
      </div>
    </ng-container>
  </div>`,
})
export default class ChatFeedComponent {
  @Input() messages?: Message[]
  @Input() userId?: string
  @Output() onSaveEdit: EventEmitter<any> = new EventEmitter()
  @Output() onDeleteMessage: EventEmitter<any> = new EventEmitter()

  identify(index: number, item: any) {
    return item._id
  }
}
