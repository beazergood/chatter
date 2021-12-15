import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime, filter, map, Subscription, tap } from 'rxjs'

@Component({
  selector: 'app-message-form',
  template: `
    <div class="flex flex-row mt-10">
      <div class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-1">
        <form [formGroup]="messageForm" autocomplete="off">
          <button
            *ngIf="hideNameInput"
            data-testid="name-edit-button"
            class="border my-3 rounded-md text-xs inline-block  text-gray-400 px-2 py-1"
            (click)="hideNameInput = !hideNameInput"
          >
            Your name (click to edit)
          </button>
          <fieldset
            *ngIf="hideNameInput"
            class="mb-2 cursor-pointer inline-block"
          >
            <label class="mr-3">{{ messageForm.controls.name.value }}</label>
          </fieldset>
          <fieldset *ngIf="!hideNameInput">
            <div class="mb-4 mt-2">
              <input
                class="shadow appearance-none rounded w-full py-2 px-3 border
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                data-testid="name"
                type="text"
                placeholder="Your name"
                formControlName="name"
                autofocus
              />
            </div>
          </fieldset>
          <fieldset *ngIf="!hideMsgInput">
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
export default class MessageFormComponent implements OnDestroy {
  @Output() onSendMessage: EventEmitter<any> = new EventEmitter()

  name: string = ''
  message: string = ''
  hideNameInput: boolean = false
  hideMsgInput: boolean = true
  formSubscription: Subscription

  messageForm: FormGroup = this.fb.group({
    name: [this.name, Validators.required],
    message: [this.message, Validators.required],
  })

  constructor(private fb: FormBuilder, private el: ElementRef) {
    this.formSubscription = this.messageForm.valueChanges
      .pipe(
        filter((formData) => !!formData),
        // debounceTime(300),
        map((formData) => {
          this.hideMsgInput = formData.name ? false : true
        })
      )
      .subscribe()
  }

  submit(): void {
    this.onSendMessage.emit(this.messageForm.value)
    this.afterSubmit()
  }

  private afterSubmit(): void {
    this.hideNameInput = true // switches name input for a label
    this.messageForm.controls.message.patchValue('') // resets the message input ready for next message
    const invalidControl = this.el.nativeElement.querySelector(
      '[formControlName="message"]'
    )
    invalidControl.focus() // focus message field for quicker chat!
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe()
  }
}
