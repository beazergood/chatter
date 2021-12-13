import { Component, OnInit } from '@angular/core'
import { Observable, tap } from 'rxjs'
// import { ChatStore } from 'src/app/chat.store'
import { DataService } from 'src/app/data.service'
import { Participant } from '../../../data.interfaces'

@Component({
  selector: 'app-page-shell',
  template: `
    <app-pure-page-shell
      [messages]="messages$"
      [participants]="participants$ | async"
      [userId]="userId$ | async"
      (onSendMessage)="dataSvc.sendMessage($event)"
      (onEditMessage)="dataSvc.editMessage($event)"
      (onDeleteMessage)="dataSvc.deleteMessage($event)"
    >
    </app-pure-page-shell>
  `,
  // providers: [ChatStore],
})
export default class PageShellComponent {
  participants$?: Observable<any>
  messages$: any[]
  userId$: Observable<any>

  constructor(public dataSvc: DataService) {
    this.messages$ = this.dataSvc.serverMessages
    this.userId$ = this.dataSvc.currentUserId$
    this.participants$ = this.dataSvc.participants$
  }
}
