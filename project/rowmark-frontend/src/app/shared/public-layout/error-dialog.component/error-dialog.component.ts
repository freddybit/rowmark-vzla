import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  imports: [],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css',
})

export class ErrorDialogComponent {

  @Input() title: string = 'Error';
  @Input() message: string = 'An unexpected error occurred. Please try again later.';

  @ViewChild('modalWindow') modalWindow!: ElementRef<HTMLDialogElement>;

  open() {
    this.modalWindow.nativeElement.showModal();
  }

  close() {
    this.modalWindow.nativeElement.close();
  }
}
