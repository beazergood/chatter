import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Participant } from '../../../../data.interfaces'

@Component({
  selector: 'app-pure-page-shell',
  template: `
    <div class="w-full flex flex-col h-screen">
      <h1 class="text-center bg-gray-200 py-6">{{ title }}</h1>

      <ul class="flex mb-0 list-none flex-wrap pb-4 flex-row">
        <li class=" last:mr-0 flex-auto text-center">
          <a
            class="text-xs font-bold uppercase px-5 py-3 block leading-normal"
            (click)="toggleTabs(1)"
            [ngClass]="{
              'bg-gray-200': openTab !== 1,
              'bg-white': openTab === 1
            }"
          >
            <i class="fas fa-space-shuttle text-base mr-1"></i>
            Chat
          </a>
        </li>
        <li class="mr-2 last:mr-0 flex-auto text-center">
          <a
            class="text-xs font-bold uppercase px-5 py-3 block leading-normal"
            (click)="toggleTabs(2)"
            [ngClass]="{
              'bg-gray-200': openTab !== 2,
              'bg-white': openTab === 2
            }"
          >
            <i class="fas fa-cog text-base mr-1"></i>
            Participants (
            {{ participants?.length }})
          </a>
        </li>
      </ul>

      <div class="relative flex flex-col min-w-0 break-words flex-1 w-full p-4">
        <div class="flex flex-col flex-1 p-1">
          <div
            [ngClass]="{
              hidden: openTab !== 1,
              block: openTab === 1
            }"
            class="flex flex-col flex-1"
          >
            <!-- CHAT TAB -->
            <app-chat-feed
              [messages]="messages"
              [userId]="userId"
              (saveChanges)="onEditMessage.emit($event)"
            >
            </app-chat-feed>
            <div class="flex-1"></div>
            <app-message-form
              (sendMessage)="onSendMessage.emit($event)"
            ></app-message-form>
          </div>

          <div [ngClass]="{ hidden: openTab !== 2, block: openTab === 2 }">
            <!-- PARTICIPANTS TAB -->
            <app-participants
              [participants]="participants"
              [userId]="userId"
            ></app-participants>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class PurePageShellComponent {
  @Input() messages?: any
  @Input() participants?: Participant[]
  @Input() participantsCount: any = 0
  @Input() userId?: string

  @Output() onSendMessage: EventEmitter<any> = new EventEmitter()
  @Output() onEditMessage: EventEmitter<any> = new EventEmitter()

  openTab = 1
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber
  }
  title = 'Status Meeting Standup'
}
