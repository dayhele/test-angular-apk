import { Component, OnInit } from '@angular/core';
import { Faq } from 'src/app/shared/interfaces/faq';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { FaqService } from 'src/app/shared/services/faq.service';

@Component({
  selector: 'app-section9',
  templateUrl: './section9.component.html',
  styleUrls: ['./section9.component.scss']
})
export class Section9Component implements OnInit {
  public questions: Faq[] = [];

  constructor(
    private faqService: FaqService,
    private checkDeviceService: CheckDeviceService
  ) {}

  ngOnInit(): void {
    this.getFaqQuestions();
  }

  public getFaqQuestions(): void {
    this.faqService
      .getFaqQuestions(this.checkDeviceService.isMobile())
      .subscribe({
        next: (questions: any) => {
          this.questions = questions;
        }
      });
  }
}
