import { Injectable } from '@angular/core';
import { PlanAccessControl } from '../interfaces/plan-access-control';

@Injectable({
  providedIn: 'root'
})
export class PlanAccessControlService {
  public userPlanAccessControl: PlanAccessControl = {
    hasParamount: undefined,
    hasHBO: false,
    hasLiveChannels: false,
    hasUolBanca: false,
    hasStingrayMusic: false,
    hasDirectvGO: undefined,
    hasNSports: false
  };

  constructor() {}

  get hasParamount(): boolean | undefined {
    return this.userPlanAccessControl.hasParamount;
  }

  set hasParamount(state: boolean | undefined) {
    this.userPlanAccessControl.hasParamount = state;
  }

  get hasHBO(): boolean {
    return this.userPlanAccessControl.hasHBO;
  }
  set hasHBO(state: boolean) {
    this.userPlanAccessControl.hasHBO = state;
  }

  get hasLiveChannels(): boolean {
    return this.userPlanAccessControl.hasLiveChannels;
  }
  set hasLiveChannels(state: boolean) {
    this.userPlanAccessControl.hasLiveChannels = state;
  }

  get hasUolBanca(): boolean {
    return this.userPlanAccessControl.hasUolBanca;
  }
  set hasUolBanca(state: boolean) {
    this.userPlanAccessControl.hasUolBanca = state;
  }

  get hasStingrayMusic(): boolean {
    return this.userPlanAccessControl.hasStingrayMusic;
  }
  set hasStingrayMusic(state: boolean) {
    this.userPlanAccessControl.hasStingrayMusic = state;
  }

  get hasDirectvGO(): boolean | undefined {
    return this.userPlanAccessControl.hasDirectvGO;
  }
  set hasDirectvGO(state: boolean | undefined) {
    this.userPlanAccessControl.hasDirectvGO = state;
  }

  get hasNSports(): boolean {
    return this.userPlanAccessControl.hasNSports;
  }
  set hasNSports(state: boolean) {
    this.userPlanAccessControl.hasNSports = state;
  }
}
