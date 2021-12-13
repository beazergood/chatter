import { environment } from '../environments/environment'

export const WS_ENDPOINT = environment.wsEndpoint

export interface Message {
  _id: string
  _userId: string
  _created: Date
  _modified?: Date
  name: string
  message: string
}

export interface Participant {
  _id: string
  name: string
}

export interface CurrentUser {
  _id: string
  name: string
}
