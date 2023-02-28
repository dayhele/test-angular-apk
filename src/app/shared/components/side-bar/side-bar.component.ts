import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';
import { Submenu } from '../../interfaces/submenu';
import { Profile } from '../../interfaces/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() public categories: Submenu[] = [];
  @Input() public profileName: any;

  public menuActive: boolean = false;
  public selectedOption: string = '';
  public profile: Profile;
  public cdnPerfil: string;
  public arrowPath: string = '';
  public closePath: string = '';

  constructor(
    public theme: Theme,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.profile = {};
    this.cdnPerfil = '';
  }

  ngOnInit(): void {
    this.getProfile();
    if (this.theme.client === 'multilaser') {
      this.arrowPath = '/assets/icons/arrow-green-right.svg';
      this.closePath = '/assets/icons/close-green.svg';
    } else if (this.theme.client === 'watch') {
      this.arrowPath = '/assets/icons/arrow-orange-right.svg';
      this.closePath = '/assets/icons/close-white.svg';
    }
  }

  public toggleSideMenu(): void {
    this.menuActive = !this.menuActive;
  }

  public optionSelect(option: string): void {
    if (this.selectedOption !== option) this.selectedOption = option;
    else this.selectedOption = '';
  }

  public openCategory(path: string, type: string, catId?: number) {
    let _title =
      path == 'Séries'
        ? 'serie'
        : path == 'Filmes para toda a família'
        ? 'filme'
        : path;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        `/search-mob/${type}?keyword=${_title}&idCategoria=${catId}`
      );
    });

    this.menuActive = false;
  }

  public getProfile(): void {
    this.profileService.profilesObservable.subscribe((profiles) => {
      if (
        profiles.success &&
        profiles.success.data &&
        profiles.success.cdnperfil
      ) {
        this.cdnPerfil = profiles.success.cdnperfil;
        for (let i = 0; i < profiles.success.data.length; i++) {
          if (
            profiles.success.data[i].id_perfis ===
            parseInt(this.profileService.selectedProfile)
          ) {
            this.profile = profiles.success.data[i];
            break;
          }
        }
      }
    });
  }

  // 67 "Awesomeness"
  // 12 "Séries"
  private excludeIdsFilme = [67, 12];
  // 9 - filmes
  private excludeIdsSerie = [9];

  get filmeCategories() {
    return this.categories.filter(
      (category) => !this.excludeIdsFilme.includes(category.id!)
    );
  }

  get serieCategories() {
    return this.categories.filter(
      (category) => !this.excludeIdsSerie.includes(category.id!)
    );
  }

  public buildImg(foto: string) {
    return foto
      ? foto
      : this.theme.client === 'multilaser'
      ? 'assets/icons/profile/default.svg'
      : 'assets/icons/profile/orange-profile.svg';
  }
}
