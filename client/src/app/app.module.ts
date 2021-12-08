import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import AppComponent from './app.component'
import ChatComponent from './components/organisms/chat/chat.component'
import ParticipantsComponent from './components/organisms/participants/participants.component'
import PageShellComponent from './components/shells/page-shell/page-shell.component'
import PurePageShellComponent from './components/shells/page-shell/pure-page-shell/pure-page-shell.component'
import MessageFormComponent from './components/molecules/message-form/message-form.component'
import ButtonComponent from './components/atoms/button/button.component'

@NgModule({
  declarations: [
    AppComponent,
    PurePageShellComponent,
    PageShellComponent,
    ChatComponent,
    ParticipantsComponent,
    MessageFormComponent,
    ButtonComponent,
  ],
  imports: [BrowserModule, RouterModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
