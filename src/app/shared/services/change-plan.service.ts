import { Injectable, EventEmitter } from '@angular/core';
import { Plan } from '../interfaces/plan';

@Injectable()
export class ChangePlanService {
  eventChangePlan = new EventEmitter<any>();
  private isChangingPlan: boolean = false;
  private newPlan?: Plan;

  constructor() { }

  getIsChangingPlan() {
    return this.isChangingPlan;
  }

  getNewPlan() {
    return this.newPlan;
  }

  setIsChangingPlan(val: boolean, newPlan?: Plan) {
    this.isChangingPlan = val;
    this.newPlan = newPlan;
    this.eventChangePlan.emit(val);
  }
}
