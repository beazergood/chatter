import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { environment } from '../environments/environment'
import { catchError, tap, switchAll } from 'rxjs/operators'
import { EMPTY, Subject } from 'rxjs'
export const WS_ENDPOINT = environment.wsEndpoint
class Message {
  constructor(
    public sender: string,
    public content: string,
    public isBroadcast = false
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private socket$: WebSocketSubject<Message> = webSocket(WS_ENDPOINT)

  private messagesSubject$ = new Subject()
  public messages$ = this.messagesSubject$.asObservable()

  constructor() {
    console.log('Data Service under construction ')
    console.log(this.socket$)
    const messages = this.socket$
      .pipe
      // tap({
      //   error: (error) => console.log(error),
      // }),
      // catchError((_) => EMPTY)
      ()
      .subscribe({
        next: (data) => console.log('[Live component] Next: ', data),
        error: (error) => console.log('[Live component] Error:', error),
        complete: () => console.log('[Live component] Connection Closed'),
      })
    this.messagesSubject$.next(messages)
  }

  sendMessage(msg: any) {
    console.log('sending message: ', msg)
    this.messagesSubject$.next(msg)
  }

  close() {
    this.socket$.complete()
  }
}
