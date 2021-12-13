import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { tap, mergeMap } from 'rxjs/operators'
import { BehaviorSubject, Observable, of } from 'rxjs'
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
        }),
        mergeMap((data) => {
          const socketData = JSON.parse(JSON.stringify(data))
          console.log('mergeMap: data = ', data)
          return of(this.processSocketData(data))
        })
      )
      .subscribe(
        (data) => {
          console.log('message from server received on client ')
        },
        (err) => console.error(err),
        () => console.warn('Completed!')
      )
  }

  private processSocketData(socketData: any) {
    this.buildParticipantsList(socketData)
    this.updateMessagesFeed(socketData)
  }

  private updateMessagesFeed(socketData: any) {
    // process any deletions/edits as well as add new messages to the chat feed
    if (socketData._newMessage || socketData._newUserId) {
      delete socketData._newMessage
      this.serverMessages.push(socketData)
    } else if (socketData._modified || socketData._deleted) {
      const targetIx = this.serverMessages.findIndex(
        (msg) => msg._id === socketData._id
      )
      console.log('targetIx: ', targetIx)
      this.serverMessages[targetIx] = socketData
      if (socketData._deleted) {
        delete this.serverMessages[targetIx]._modified
        this.serverMessages[targetIx].message = 'Deleted'
      }
    }
  }

  private buildParticipantsList(socketData: any) {
    const userData = {
      _id: socketData._userId,
      name: socketData.name,
    }
    let updatedParticipantsList

    if (socketData.newConnection) {
      this.addNewLocalUser(socketData)
    }

    var index = this.participantsList.findIndex((x) => x._id == userData._id)

    index === -1 // not in list, add user to local array
      ? (updatedParticipantsList = this.participantsList.concat([userData])) // concat user into array
      : (updatedParticipantsList = this.participantsList) // user already in local array

    this._participants.next(updatedParticipantsList)
    this.participantsList = updatedParticipantsList
  }

  private addNewLocalUser(socketData: any): void {
    this._currentUserId.next(socketData._newUserId)
  }

  sendMessage(msg: any) {
    const serverPayload = {
      message: {
        ...msg,
        _userId: this._currentUserId.getValue(),
      },
      control: 'add',
    }
    console.log('sending message: ', serverPayload)
    this._websocket.next(serverPayload)
  }

  editMessage(msg: any) {
    const serverPayload = {
      message: {
        ...msg,
      },
      control: 'edit',
    }
    console.log('editMessage: ', serverPayload)
    this._websocket.next(serverPayload)
  }

  deleteMessage(msg: any) {
    const serverPayload = {
      message: {
        ...msg,
      },
      control: 'delete',
    }
    console.log('deleteMessage: ', serverPayload)
    this._websocket.next(serverPayload)
  }

  close() {
    this._websocket.complete()
  }
}
