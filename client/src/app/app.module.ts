import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import AppComponent from './app.component'
import ChatComponent from './components/chat/chat.component'
import ParticipantsComponent from './components/participants/participants.component'
import PageShellComponent from './components/page-shell/page-shell.component'
import ButtonComponent from './components/button/button.component'
import PurePageShellComponent from './components/page-shell/pure-page-shell/pure-page-shell.component'

@NgModule({
  declarations: [
    AppComponent,
    PurePageShellComponent,
    PageShellComponent,
    ChatComponent,
    ParticipantsComponent,
    ButtonComponent,
  ],
  imports: [BrowserModule, RouterModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
