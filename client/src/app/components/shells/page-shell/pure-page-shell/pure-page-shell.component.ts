import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Message } from '../../../organisms/chat/chat.component'
import { Participant } from '../../../organisms/participants/participants.component'

@Component({
  selector: 'app-pure-page-shell',
  template: `
    <div class="w-full">
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
            <i class="fas fa-space-shuttle text-base mr-1"></i> Participants (
            {{ participants?.length }})
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
            <i class="fas fa-cog text-base mr-1"></i> Chat
          </a>
        </li>
      </ul>
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 "
      >
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div [ngClass]="{ hidden: openTab !== 1, block: openTab === 1 }">
              <app-participants
                [participants]="participants"
              ></app-participants>
            </div>
            <div [ngClass]="{ hidden: openTab !== 2, block: openTab === 2 }">
              <app-chat
                [messages]="messages"
                (onSendMessage)="onSendMessage.emit($event)"
              >
              </app-chat>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class PurePageShellComponent {
  @Input() messages?: Message[]
  @Input() participants?: Participant[]
  @Output() onSendMessage: EventEmitter<any> = new EventEmitter()

  openTab = 1
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber
  }
  title = 'Status Meeting Standup'
}
