import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Message } from 'src/app/data.interfaces'

@Component({
  selector: 'app-chat-item',
  template: `
    <div class="flex flex-row">
      <div class="flex-1">
        <p>
          <span class="font-semibold mr-2">{{ msg.name }}</span>
          <span class="text-gray-400">{{ msg._created | date: 'HH:mm' }}</span>
          <span class="pl-1 ml-1 text-xs text-gray-400" *ngIf="msg._modified"
            >&nbsp; (edited)</span
          >
          <span class="pl-1 ml-1 text-xs text-gray-400" *ngIf="msg._deleted"
            >&nbsp; (deleted)</span
          >
        </p>
        <p *ngIf="!editing">{{ msg.message }}</p>
        <ng-container *ngIf="editing">
          <form [formGroup]="msgForm">
            <fieldset>
              <div class="flex flex-row">
                <input
                  class="shadow appearance-none rounded w-full py-2 px-3 mr-2 border
     text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1"
                  id="name"
                  data-testid="name"
                  type="text"
                  placeholder="Message"
                  formControlName="message"
                />

                <button
                  class="w-14 h-14 bg-purple-400 hover:shadow-md rounded-full text-white"
                  (click)="save()"
                >
                  <i class="fa fa-save"></i>
                </button>
              </div>
            </fieldset>
          </form>
        </ng-container>
      </div>
      <button
        class="w-14 h-14 hover:bg-gray-100 rounded-full "
        *ngIf="msg._id && msg._userId === userId && !editing"
        (click)="editMessage()"
      >
        <i class="fa fa-pencil"></i>
      </button>
    </div>
  `,
})
export default class ChatItemComponent implements OnInit {
  @Input() msg!: Message
  @Input() userId?: string
  @Output() onSaveEdit: EventEmitter<any> = new EventEmitter()
  @Output() onDeleteMessage: EventEmitter<any> = new EventEmitter()

  msgForm: FormGroup = this.fb.group({
    message: [''],
  })
  editing: boolean = false

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
    if (editPayload.message === '' && confirm('Wanna delete this message?')) {
      this.onDeleteMessage.emit(editPayload)
    } else {
      this.onSaveEdit.emit(editPayload)
    }
  }
}
