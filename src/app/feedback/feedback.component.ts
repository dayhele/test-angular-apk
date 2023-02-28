import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { FeedbackService } from '../shared/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  public showModal: boolean = false;
  public allPlataforms: any = {
    value: 'Todas as plataformas',
    isSelected: false,
    plataforma: [
      { value: 'Mobile', isSelected: false },
      { value: 'TV', isSelected: false },
      { value: 'Web', isSelected: false },
      { value: 'Roku', isSelected: false },
      { value: 'Fire TV stick', isSelected: false },
      { value: 'TV Box', isSelected: false },
      { value: 'Dispositivos Elsys', isSelected: false }
    ]
  };

  public assuntos: string[] = [
    'Feedback geral',
    'Outros',
    'Assinaturas',
    'Conteúdos áudiovisuais',
    'Desempenho',
    'Experiência de uso',
    'Locação',
    'Melhoria do produto',
    'Pagamento',
    'Reprodução',
    'Segurança'
  ];

  public form: any = { assunto: '' };
  public allSelected: boolean = false;
  public plataformError?: boolean = false;
  public topicError?: boolean = false;
  public selectedOpen: boolean = false;

  constructor(
    public theme: Theme,
    private router: Router,
    private feedbackService: FeedbackService
  ) {
    if (this.theme.client !== 'watch') this.router.navigateByUrl('/home');
  }

  public setAll($event: boolean): void {
    this.allSelected = $event;

    this.allPlataforms.plataforma.forEach((plataform: any) => {
      plataform.isSelected = $event;
    });
  }

  public updateAllSelected(): void {
    this.allSelected = this.allPlataforms.plataforma.every((plataform: any) => {
      return plataform.isSelected === true;
    });
  }

  public settingPlataformArray(): void {
    this.form.plataforma = this.allPlataforms.plataforma
      .filter((plataform: any) => {
        return plataform.isSelected === true;
      })
      .map((value: any) => {
        return value.value;
      });
  }

  public sendForm(): void {
    this.form.email = localStorage.getItem('email');
    this.settingPlataformArray();

    if (this.form.plataforma == false) {
      this.plataformError = true;
      return;
    }

    if (!this.form.assunto) {
      this.topicError = true;
      return;
    }

    delete this.plataformError;

    var form_data = new FormData();

    Object.keys(this.form).forEach((key) => {
      form_data.append(key, this.form[key]);
    });

    this.feedbackService.sendFeedback(form_data).subscribe({
      next: () => {
        this.showModal = true;
      }
    });
  }

  public goHome(): void {
    this.router.navigateByUrl('/home');
  }

  public newFeedback(): void {
    window.location.reload();
  }
}
