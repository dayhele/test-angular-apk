import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  ViewChild,
  Output
} from '@angular/core';
import { ModalOptions } from '../../interfaces/delete-modal-props';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnChanges {
  @Input() modalOptions: ModalOptions;
  @Input() confirmationOnly: boolean;
  @Output() eventEmitter: EventEmitter<ModalOptions> = new EventEmitter();

  constructor() {
    this.modalOptions = {};
    this.confirmationOnly = false;
  }

  @ViewChild('modal') public modal?: ElementRef<HTMLDivElement>;

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

  public confirm(): void {
    this.closeModalAndEmitEvent(() => {
      this.modalOptions.events!.confirm = true;
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
