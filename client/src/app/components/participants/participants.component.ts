import { Component, Input, OnChanges } from '@angular/core'

@Component({
  selector: 'app-participants',
  template: `
    <div class="p-2">
      <ng-container *ngIf="participants">
        <ul class="w-100">
          <li
            *ngFor="let participant of participants"
            class="p-4 border-b border-gray-200"
          >
            {{ participant.name }}
            <span *ngIf="participant._id === userId">👈 YOU</span>
          </li>
        </ul>
      </ng-container>
    </div>
  `,
})
export default class ParticipantsComponent implements OnChanges {
  @Input() userId?: string
  @Input() participants?: any = []

  ngOnChanges(changes: any) {
    console.log('changes: ', changes)
    if (changes.userId && !changes.userId.firstChange) {
    }
  }
}
