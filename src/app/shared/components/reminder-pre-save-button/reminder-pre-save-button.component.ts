import { Component, Input, OnInit } from '@angular/core';
import { CardData } from '../../interfaces/card';
import { PreSaves } from '../../interfaces/pre-saves';
import { LoginService } from '../../services/login.service';
import { PreSaveService } from '../../services/pre-save.service';

@Component({
  selector: 'app-reminder-pre-save-button',
  templateUrl: './reminder-pre-save-button.component.html',
  styleUrls: ['./reminder-pre-save-button.component.scss']
})
export class ReminderPreSaveButtonComponent implements OnInit {
  @Input() public preSave: CardData | PreSaves;
  @Input() public idPerfil: number;

  private readonly preSaveIconPath =
    'https://watchbr-resources.s3.amazonaws.com/pre_saves_icons';
  public environment: any;
  public icon: string;
  public text: string;

  constructor(
    public loginService: LoginService,
    private preSaveService: PreSaveService
  ) {
    this.preSave = {};
    this.icon = `${this.preSaveIconPath}/reminder-pre-save-icon.svg`;
    this.text = 'Avisar';
    this.idPerfil = 0;
  }

  ngOnInit(): void {
    if (this.preSave.isSaved) {
      this.icon = `${this.preSaveIconPath}/pre-save-saved.svg`;
      this.text = 'Aviso salvo';
    }
  }

  public rememberMe(): void {
    if (!!this.idPerfil && this.preSave && !this.preSave.isSaved) {
      this.preSaveService
        .rememberMe(this.idPerfil, this.preSave.id!)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.icon = `${this.preSaveIconPath}/pre-save-saved.svg`;
              this.text = 'Aviso salvo';
            }
          },
          error: (err) => console.error(err)
        });
    }
  }
}
