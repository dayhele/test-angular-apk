import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';
import { ModalOptions } from '../../interfaces/delete-modal-props';

@Component({
  selector: 'app-delete-profile-modal',
  templateUrl: './delete-profile-modal.component.html',
  styleUrls: ['./delete-profile-modal.component.scss']
})
export class DeleteProfileModalComponent implements OnChanges {
  @Input() modalOptions: ModalOptions;
  @Output() eventEmitter: EventEmitter<ModalOptions> = new EventEmitter();

  constructor() {
    this.modalOptions = {};
  }

  @ViewChild('modal')
  public modal?: ElementRef<HTMLDivElement>;

  ngOnChanges(): void {
    if (this.modalOptions.isOpen) {
      if (
        this.modal &&
        this.modal.nativeElement &&
        this.modal.nativeElement.parentElement &&
        this.modal.nativeElement.parentElement.style
      ) {
        this.modal.nativeElement.parentElement.style.zIndex = '1';
        this.modal.nativeElement.style.transform = 'scale(1)';
      }
    }
  }

  public cancel(): void {
    this.closeModalAndEmitEvent(() => {
      this.modalOptions.events!.close = true;
    });
  }

  public confirmDelete(): void {
    this.closeModalAndEmitEvent(() => {
      this.modalOptions.events!.confirmDelete = true;
    });
  }

  public closeModalAndEmitEvent(event: () => void): void {
    if (
      this.modal &&
      this.modal.nativeElement &&
      this.modal.nativeElement.parentElement &&
      this.modal.nativeElement.parentElement.style
    ) {
      this.modal.nativeElement.style.transform = 'scale(0)';
      this.modal.nativeElement.parentElement.style.zIndex = '-1';
      event();
      this.eventEmitter.emit(this.modalOptions);
    }
  }
}
