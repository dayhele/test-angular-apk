import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-no-content',
  templateUrl: './modal-no-content.component.html',
  styleUrls: ['./modal-no-content.component.scss']
})
export class ModalNoContentComponent {
  @Output() public closeEvent: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  public closeButton(): void {
    this.closeEvent.emit();
  }

  public changePlan(): void {
    this.router.navigateByUrl('/planos');
  }
}
