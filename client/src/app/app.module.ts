import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import AppComponent from './app.component'
import ChatFeedComponent from './components/chat-feed/chat-feed.component'
import ChatItemComponent from './components/chat-item/chat-item.component'
import ParticipantsComponent from './components/participants/participants.component'
import PageShellComponent from './components/shells/page-shell/page-shell.component'
import PurePageShellComponent from './components/shells/page-shell/pure-page-shell/pure-page-shell.component'
import MessageFormComponent from './components/message-form/message-form.component'

@NgModule({
  declarations: [
    AppComponent,
    PurePageShellComponent,
    PageShellComponent,
    ChatFeedComponent,
    ChatItemComponent,
    ParticipantsComponent,
    MessageFormComponent,
  ],
  imports: [BrowserModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
