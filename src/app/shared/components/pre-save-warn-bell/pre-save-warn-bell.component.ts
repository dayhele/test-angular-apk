import { Component, Input, OnInit } from '@angular/core';
import { PreSaveService } from '../../services/pre-save.service';

@Component({
  selector: 'app-pre-save-warn-bell',
  templateUrl: './pre-save-warn-bell.component.html',
  styleUrls: ['./pre-save-warn-bell.component.scss']
})
export class PreSaveWarnBellComponent implements OnInit {
  public iconsPath: string =
    'https://watchbr-resources.s3.amazonaws.com/pre_saves_icons';
  public icon: string = `${this.iconsPath}/reminder-pre-save-icon.svg`;
  public isRequest: boolean = false;
  @Input() public preSaveId: number = 0;
  @Input() public isSaved: boolean = false;
  @Input() public idPerfil: number = 0;

  constructor(private preSaveService: PreSaveService) {}

  ngOnInit(): void {
    if (this.isSaved) this.icon = `${this.iconsPath}/pre-save-saved.svg`;
  }

  public save(): void {
    if (!!this.idPerfil && !this.isSaved) {
      this.isRequest = true;

      this.preSaveService.rememberMe(this.idPerfil, this.preSaveId).subscribe({
        next: (res) => {
          if(res.success) this.icon = `${this.iconsPath}/pre-save-saved.svg`;
        },
        error: (err) => console.error(err),
        complete: () => this.isRequest = false
      });
    }
  }
}
