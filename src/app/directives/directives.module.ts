import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineDirective } from './timeline.directive';
import { ScheduleSectionDirective } from './schedule-section.directive';
import { MobileMenuDirective } from './mobile-menu.directive';
import { DropdownDirective } from './dropdown.directive';
import { QuestionDirective } from './question.directive';

@NgModule({
  declarations: [
    TimelineDirective,
    ScheduleSectionDirective,
    MobileMenuDirective,
    DropdownDirective,
    QuestionDirective
  ],
  exports: [
    TimelineDirective,
    ScheduleSectionDirective,
    MobileMenuDirective,
    DropdownDirective,
    QuestionDirective
  ],
  imports: [CommonModule]
})
export class DirectivesModule {}
