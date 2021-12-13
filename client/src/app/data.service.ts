import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { tap } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs'
import { Participant, WS_ENDPOINT } from './data.interfaces'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _websocket: WebSocketSubject<any> = webSocket(WS_ENDPOINT)

  private _messages: BehaviorSubject<any> = new BehaviorSubject([])
  public messages$ = this._messages.asObservable()

  private participantsList: Participant[] = []
  private _participants: BehaviorSubject<any> = new BehaviorSubject([])
  public participants$: Observable<any> = this._participants.asObservable()

  public serverMessages: any[] = []

  private _currentUserId: BehaviorSubject<any> = new BehaviorSubject(null)
  public currentUserId$: Observable<string> = this._currentUserId.asObservable()

  constructor() {
    this._websocket
      .pipe(
        tap({
          next: (data) => console.log('[Live observable] Next: ', data),
          error: (error) => console.log('[Live observable] Error:', error),
          complete: () => console.log('[Live observable] Connection Closed'),
        })
      )
      .subscribe(
        (data) => {
          console.log(
            'message from server being pushed to client array: ',
            JSON.parse(JSON.stringify(data))
          )

          const socketData = JSON.parse(JSON.stringify(data))
          this.processSocketData(socketData)
        },
        (err) => console.error(err),
        () => console.warn('Completed!')
      )
  }

  private processSocketData(socketData: any) {
    this.buildParticipantsList(socketData)
    this.updateMessagesFeed(socketData)
  }

  private createParticipant(socketData: any): void {
    this._currentUserId.next(socketData._newUserId)
  }

  private updateMessagesFeed(socketData: any) {
    // process any deletions/edits as well as add new messages to the chat feed
    // TODO update the serverMessages array to reflect any edits
    if (socketData._newMessage || socketData._newUserId) {
      this.serverMessages.push(socketData)
    } else if (socketData._editedMessage) {
      const targetIx = this.serverMessages.findIndex(
        (msg) => msg._id === socketData._id
      )
      console.log('targetIx: ', targetIx)
      this.serverMessages[targetIx] = socketData
    }
  }

  private buildParticipantsList(socketData: any) {
    const userData = {
      _id: socketData._userId,
      name: socketData.name,
    }
    let updatedParticipantsList

    if (socketData.newConnection) {
      this.createParticipant(socketData)
    }

    console.log(
      'existing participant, add if not already present in: ',
      this.participantsList
    )
    var index = this.participantsList.findIndex((x) => x._id == userData._id)

    index === -1 // not in list, add object to local array
      ? (updatedParticipantsList = this.participantsList.concat([userData])) // this.participantsList with userData in it
      : (updatedParticipantsList = this.participantsList) // just existing participantsList

    console.log('😎😎 updatedParticipantsList: ', updatedParticipantsList)
    this._participants.next(updatedParticipantsList)
  }

  sendMessage(msg: any) {
    const serverPayload = {
      ...msg,
      _created: new Date(),
      _userId: this._currentUserId.getValue(),
      _editedMessage: false,
      _newMessage: true,
    }
    console.log('sending message: ', serverPayload)
    this._websocket.next(serverPayload)
  }

  editMessage(msg: any) {
    const serverPayload = {
      ...msg,
      _modified: new Date(),
      _editedMessage: true,
      _newMessage: false,
    }
    console.log('editMessage: ', serverPayload)
    this._websocket.next(serverPayload)
  }

  close() {
    this._websocket.complete()
  }
}
