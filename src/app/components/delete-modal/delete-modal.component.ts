import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  @Input() active: boolean = false;
  @Input() movieId: number | string = '';
  @Input() toggleModal: any;
}
