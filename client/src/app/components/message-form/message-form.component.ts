import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-message-form',
  template: `
    <div class="flex flex-row mt-10">
      <div class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-1">
        <form [formGroup]="messageForm" autocomplete="off">
          <fieldset
            *ngIf="hideNameInput"
            class="mb-2"
            (click)="hideNameInput = !hideNameInput"
          >
            <label>{{ messageForm.controls.name.value }}</label>
          </fieldset>
          <fieldset *ngIf="!hideNameInput">
            <div class="mb-4">
              <input
                class="shadow appearance-none rounded w-full py-2 px-3 border
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                data-testid="name"
                type="text"
                placeholder="Your name"
                formControlName="name"
              />
            </div>
          </fieldset>
          <fieldset *ngIf="messageForm.controls.name.value">
            <div class="mb-4">
              <input
                class="shadow appearance-none rounded w-full py-2 px-3 border
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                data-testid="message"
                type="text"
                placeholder="Message"
                formControlName="message"
              />
            </div>
          </fieldset>
        </form>
        <div class="flex content-center">
          <span class="flex-1"></span>
          <button
            class="p-2 w-full rounded-md  md:w-64 text-white"
            type="submit"
            data-testid="submit-button"
            [ngClass]="{ 'shadow-md bg-purple-400': messageForm.valid }"
            [disabled]="!messageForm.valid"
            (click)="submit()"
          >
            Send
          </button>
          <span class="flex-1"></span>
        </div>
      </div>
    </div>
  `,
})
export default class MessageFormComponent {
  @Output() onSendMessage: EventEmitter<any> = new EventEmitter()

  name: string = ''
  message: string = ''
  hideNameInput: boolean = false

  constructor(private fb: FormBuilder) {}

  messageForm: FormGroup = this.fb.group({
    name: [this.name, Validators.required],
    message: [this.message, Validators.required],
  })

  submit(): void {
    console.log('submitting form : ', this.messageForm.value)
    this.onSendMessage.emit(this.messageForm.value)
    this.afterSubmit()
  }

  private afterSubmit(): void {
    this.hideNameInput = true // switches name input to a label
    this.messageForm.controls.message.patchValue('') // resets the message input ready for next message
  }
}
