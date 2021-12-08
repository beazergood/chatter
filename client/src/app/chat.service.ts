import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'
import { webSocket } from 'rxjs/webSocket'
import { environment } from '../environments/environment'
import { Observable } from 'rxjs'

export const WS_ENDPOINT = environment.wsEndpoint

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // private socket$: WebSocketsubject$<any>

  private subject$: any = webSocket(WS_ENDPOINT)

  constructor(private http: HttpClient) {
    // this.subject$.subscribe(
    //   (msg) => console.log('message received: ' + msg), // Called whenever there is a message from the server.
    //   (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    //   () => console.log('complete') // Called when connection is closed (for whatever reason).
    // )
  }

  public connectToApi(): Observable<any> {
    let headers = new HttpHeaders()
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('connection', 'Upgrade')

    console.log('callings connectToApi')
    return this.http.post('http://localhost:5001/websockets', '', {
      headers: headers,
    })
  }
  // private messagessubject$$ = new subject$()
  // public messages$ = this.messagessubject$$.pipe(switchAll(), catchError(e => { throw e }));

  // public connect(): void {
  //   if (!this.socket$ || this.socket$.closed) {
  //     this.socket$ = this.getNewWebSocket()
  //     const messages = this.socket$.pipe(
  //       tap({
  //         error: (error) => console.log(error),
  //       }),
  //       catchError((_) => EMPTY)
  //     )
  //     this.messagessubject$$.next(messages)
  //   }

  // private subject$: webSocket(WS_ENDPOINT)

  // subject$.subscribe()
  // Note that at least one consumer has to subscribe to the created subject$ - otherwise "nexted" values will be just buffered and not sent,
  // since no connection was established!

  // subject$.next({ message: 'some message' })
  // This will send a message to the server once a connection is made. Remember value is serialized with JSON.stringify by default!

  // subject$.complete() // Closes the connection.

  // subject$.error({ code: 4000, reason: 'I think our app just broke!' })
  // Also closes the connection, but let's the server know that this closing is caused by some error.
  // }

  // private getNewWebSocket() {
  //   return webSocket(WS_ENDPOINT)
  // }
  // sendMessage(msg: any) {
  //   this.socket$.next(msg)
  // }
  // close() {
  //   this.socket$.complete()
  // }

  public onSendMessage(ev: any) {
    console.log('chat service send this message ', ev)
    return
  }
}
