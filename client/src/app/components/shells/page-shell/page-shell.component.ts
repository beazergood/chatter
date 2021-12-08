import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { ChatService } from 'src/app/chat.service'
import { DataService } from 'src/app/data.service'
import { Message } from '../../organisms/chat/chat.component'
import { Participant } from '../../organisms/participants/participants.component'

@Component({
  selector: 'app-page-shell',
  template: `
    <app-pure-page-shell
      [messages]="messages"
      [participants]="participants"
      (onSendMessage)="chatSvc.onSendMessage($event)"
    >
    </app-pure-page-shell>
  `,
})
export default class PageShellComponent {
  participants?: Participant[]
  messages?: Message[]
  liveData$: Observable<any>

  constructor(public chatSvc: ChatService, private service: DataService) {
    this.liveData$ = this.service.messages$
      .pipe
      // tap({
      //   next: (data) => console.log('[Live component] Next: ', data),
      //   error: (error) => console.log('[Live component] Error:', error),
      //   complete: () => console.log('[Live component] Connection Closed'),
      // })
      ()
  }

  buttonClicked() {
    console.log('pinging api with a message for websocket server')
    const msg = JSON.stringify({ name: 'Dave' })
    this.service.sendMessage(msg)
  }
}
