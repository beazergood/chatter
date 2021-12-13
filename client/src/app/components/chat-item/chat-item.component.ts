import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Message } from 'src/app/data.interfaces'

@Component({
  selector: 'app-chat-item',
  template: `
    <p>
      <span class="font-semibold mr-2">{{ msg.name }}</span>
      <span class="text-gray-400">{{ msg._created | date: 'HH:mm' }}</span>
    </p>
    <p *ngIf="!editing">{{ msg.message }}</p>
    <p class="text-xs text-gray-600" *ngIf="msg._modified">Edited</p>
    <ng-container *ngIf="editing">
      <p>Editing</p>
      <form [formGroup]="msgForm">
        <fieldset>
          <div class="mb-4">
            <input
              class="shadow appearance-none rounded w-full py-2 px-3 border
     text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              data-testid="name"
              type="text"
              placeholder="Message"
              formControlName="message"
            />
          </div>
        </fieldset>
        <button class="" (click)="save()">Save changes</button>
      </form>
    </ng-container>
    <button *ngIf="msg._id && msg._userId === userId" (click)="editMessage()">
      Edit
    </button>
  `,
})
export default class ChatItemComponent implements OnInit {
  @Input() msg!: Message
  @Input() userId?: string
  @Output() saveChanges: EventEmitter<any> = new EventEmitter()

  editing: boolean = false

  msgForm: FormGroup = this.fb.group({
    message: [''],
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.msgForm.controls.message.patchValue(this.msg.message)
  }

  editMessage() {
    console.log('editMessage(): ')
    this.editing = !this.editing
  }

  save() {
    console.log('saveChanges ')
    this.editing = false
    const editPayload = {
      ...this.msg,
      message: this.msgForm.controls.message.value,
    }
    console.log('editPayload: ', editPayload)
    this.saveChanges.emit(editPayload)
  }
}
