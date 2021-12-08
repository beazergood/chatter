import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { environment } from '../environments/environment'
import { tap } from 'rxjs/operators'
import { BehaviorSubject, Subject } from 'rxjs'
export const WS_ENDPOINT = environment.wsEndpoint

export interface Message {
  name: string
  message: string
  time: Date
  isBroadcast: boolean
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private socket$: WebSocketSubject<any> = webSocket(WS_ENDPOINT) // works
  private _messages: BehaviorSubject<any> = new BehaviorSubject([])
  public messages$ = this._messages.asObservable()
  public serverMessages = new Array<Message>()

  constructor() {
    this.socket$
      .pipe(
        tap({
          next: (data) => console.log('[Live observable] Next: ', data),
          error: (error) => console.log('[Live observable] Error:', error),
          complete: () => console.log('[Live observable] Connection Closed'),
        })
        // catchError((_) => EMPTY)
      )
      .subscribe(
        (message) => {
          console.log(
            'message from server being pushed to client array: ',
            JSON.parse(JSON.stringify(message))
          )
          // why is message an Array Buffer?!
          this.serverMessages.push(JSON.parse(JSON.stringify(message)))
        },
        (err) => console.error(err),
        () => console.warn('Completed!')
      )
  }

  sendMessage(msgStr: any) {
    console.log('sending message: ', msgStr)
    const msg = {
      message: msgStr,
      name: 'Dave B',
      isBroadcast: false,
      time: new Date(),
    }
    // this.serverMessages.push(msg)
    this.socket$.next(msg)
    console.log('serverMessages: ', this.serverMessages)
  }

  close() {
    this.socket$.complete()
  }
}
