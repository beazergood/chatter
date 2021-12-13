import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { Observable, switchMap } from 'rxjs'
import { DataService } from './data.service'
import { Message } from './data.interfaces'

export interface ChatState {
  messages: Message[]
}

@Injectable()
export class ChatStore extends ComponentStore<ChatState> {
  constructor(private dataSvc: DataService) {
    super({ messages: [] })
  }

  // TODO plumb in NGRX component store to get more experience using that!

  // Each new call of sendMessage(msg) pushes that msg into message$ stream.
  // readonly sendMessage = this.effect((message$: Observable<string>) => {
  // return message$.pipe(
  //   // 👇 Handle race condition with the proper choice of the flattening operator.
  //   switchMap((msg) => this.dataSvc.sendMessage(msg).pipe(
  //     //👇 Act on the result within inner pipe.
  //     tap({
  //       next: (msg) => this.addMsg(msg),
  //       error: (e) => console.error(e),
  //     }),
  //     // 👇 Handle potential error within inner pipe.
  //     catchError(() => EMPTY),
  //   )),
  // );
  // })
}
