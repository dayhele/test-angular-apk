import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login.service';
import { WelcomeService } from 'src/app/shared/services/welcome.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section6',
  templateUrl: './section6.component.html',
  styleUrls: ['./section6.component.scss']
})
export class Section6Component implements OnInit {
  public myControl = new FormControl('');
  public filteredCitysOptionsComplete: Observable<string[]> | undefined;
  public citysOptionsComplete: string[] = [];
  public regionProviders: any = [];
  public providers: any = {};
  public environment: any;

  constructor(
    private welcomeService: WelcomeService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.environment = environment;
  }

  ngOnInit(): void {
    this.filteringOptionsComplete();
    this.getStatesOptionsComplete();
    this.searchCity();
  }

  private _filter(value: string): string[] {
    const filterValue = value;

    return this.citysOptionsComplete.filter((option) =>
      option.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  private filteringOptionsComplete() {
    this.filteredCitysOptionsComplete = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private getStatesOptionsComplete() {
    this.welcomeService.getStates().subscribe((states) => {
      this.gettingCitys(states.data);
    });
  }

  private gettingCitys(statesAndCitys: any) {
    for (let indexState = 0; indexState < statesAndCitys.length; indexState++) {
      for (
        let indexCitys = 0;
        indexCitys < statesAndCitys[indexState].citys.length;
        indexCitys++
      ) {
        this.citysOptionsComplete.push(
          statesAndCitys[indexState].state +
            ' - ' +
            statesAndCitys[indexState].citys[indexCitys].name
        );
      }
      this.citysOptionsComplete.sort();
    }
    this.citysOptionsComplete.sort((a, b) => {
      return a.localeCompare(b);
    });
  }

  public searchCity() {
    let city = this.myControl.value
      ? this.myControl.value[0]?.toUpperCase() +
        this.myControl.value?.substring(1)
      : '';

    let state = '';

    state = city?.split(' - ')[0];
    city = city?.split(' - ')[1];

    this.welcomeService.searchStates(city, state).subscribe((data: any) => {
      this.providers = data;
      this.regionProviders = [];

      for (let index = 0; index < data.data.length; index++) {
        this.regionProviders.push(data.data[index]);
      }

      this.regionProviders.sort((a: any, b: any) =>
        a.company > b.company ? 1 : b.company > a.company ? -1 : 0
      );
    });
  }

  public goTo(path: string) {
    this.loginService.clearUnloggedDetails();
    this.router.navigateByUrl(path);
  }
}
