import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardProperties } from '../../interfaces/card-default';
import { WatchService } from '../../../watch/shared/watch.service';
import { EpisodeData } from '../../interfaces/movie';
import { environment } from '../../../../environments/environment';
import { PlanAccessControlService } from '../../services/plan-access-control.service';

@Component({
  selector: 'app-episodes-section',
  templateUrl: './episodes-section.component.html',
  styleUrls: ['./episodes-section.component.scss']
})
export class EpisodesSectionComponent {
  public environment: any;
  @Input() public type: string;
  @Input() public serieId?: number;
  @Input() public episode?: EpisodeData;
  @Input() public cardProperties?: CardProperties;
  @Input() public episodePosition?: number;
  @Input() public episodeDuration?: number;
  @Input() public censorship?: string;
  @Input() public isParamountFreemium?: boolean;
  @Input() public isParamount?: boolean;

  @Output() hasntParamount: EventEmitter<any> = new EventEmitter();

  public isUnloggedSession: boolean = false;

  constructor(
    private watchService: WatchService,
    private planAccessControlService: PlanAccessControlService
  ) {
    this.type = '';
    this.serieId = 0;
    this.episode = {};
    this.cardProperties = {};
    this.environment = environment;
    this.episodePosition = 0;
    this.episodeDuration = 0;

    this.isUnloggedSession =
      sessionStorage.getItem('isUnloggedSession') === 'true';
  }

  public play(): void {
    if (this.isUnloggedSession) return;

    if (
      this.isParamount &&
      !this.planAccessControlService.hasParamount &&
      !this.isParamountFreemium
    ) {
      this.hasntParamount.emit();
      return;
    }

    this.watchService.watch(
      this.serieId!,
      this.type,
      false,
      this.episode?.id,
      false
    );
  }
  public callMarathon() {
    this.watchService.watch(
      this.serieId!,
      'serie',
      false,
      this.episode?.id,
      true
    );
  }
}
