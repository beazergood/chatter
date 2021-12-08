import { Component, OnInit } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { DataService } from 'src/app/data.service'
import { Message } from '../../chat/chat.component'
import { Participant } from '../../participants/participants.component'

@Component({
  selector: 'app-page-shell',
  template: `
    <app-pure-page-shell
      [messages]="serverMessages"
      [participants]="participants"
      (onSendMessage)="buttonClicked($event)"
    >
    </app-pure-page-shell>
  `,
})
export default class PageShellComponent {
  participants?: Participant[]
  serverMessages: any

  constructor(private dataSvc: DataService) {
    this.serverMessages = this.dataSvc.serverMessages
  }

  buttonClicked(ev: any) {
    this.dataSvc.sendMessage(ev.message)
  }
}
