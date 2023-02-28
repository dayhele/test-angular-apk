import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CheckConnectionService } from '../../services/check-connection.service';

@Component({
  selector: 'app-check-connection',
  templateUrl: './check-connection.component.html',
  styleUrls: ['./check-connection.component.scss']
})
export class CheckConnectionComponent {
  @Input() public type: number = 0;
  @Output() clickEvent: EventEmitter<Number> = new EventEmitter();

  constructor(
    private router: Router,
    private checkConnectionService: CheckConnectionService
  ) {}

  public click(option: boolean): void {
    this.clickEvent.emit();

    if (!option) {
      this.router.navigateByUrl('/profile/select');
      return;
    }

    let connectMyProfileSub = this.checkConnectionService
      .connectMyProfile()
      .subscribe(() => {
        connectMyProfileSub.unsubscribe();
      });
  }
}
