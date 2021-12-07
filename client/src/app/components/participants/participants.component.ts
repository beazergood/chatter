import { Component, Input } from '@angular/core'
export const participantsData = [
  {
    firstname: 'Elon',
    lastname: 'Musk',
  },
  {
    firstname: 'Jeff',
    lastname: 'Bezos',
  },
  {
    firstname: 'JB',
    lastname: 'Straubel',
  },
  {
    firstname: 'Reid',
    lastname: 'Hoffman',
  },
]

export interface Participant {
  firstname: string
  lastname: string
}

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
            {{ participant.firstname }} {{ participant.lastname }}
          </li>
        </ul>
      </ng-container>
    </div>
  `,
})
export default class ParticipantsComponent {
  @Input() participants?: Participant[]
}
