import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-error-dialog.component',
  imports: [],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css',
})
export class ErrorDialogComponent {

  @Input() title: string = 'Error';
  @Input() message: string = 'An unexpected error occurred. Please try again later.';
  @ViewChild('modalWindow') modalWindow!: HTMLDialogElement;

  open(){
    this.modalWindow.showModal();
  }

  close(){
    this.modalWindow.close();
  }

}
