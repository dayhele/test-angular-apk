import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../app/shared/components/header/header.component';
import { ProfileService } from '../../app/shared/services/profile.service';
import { HitoricService } from "../shared/services/hitoric.service";
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {
  @Input() public profile: Profile = {};
  @Input() public profileList: Profile[];
  
  constructor(
    private profileService: ProfileService,
    private hitoricService: HitoricService,
    public theme: Theme,
  ) {
    this.profileList = [];
  }
  ngOnInit(): void {
    this.getProfileList();
    this.requestAllUserHistoric()
   
  }

  profiles: Array<any> = [];
  public getProfileList(): void {
    this.profileService.profilesObservable.subscribe((profiles: any) => {
      this.profiles = profiles.success?.data;
    });
  }

  selectedAccount: string = '';
  selectProfile(profileSelect: string, id_perfis: number) {
    this.idPerfil = id_perfis;
    this.selectedAccount = profileSelect;
    this.showDropdow = false;
    this.showDeleteLink=true
    this.historicListRequest(this.idPerfil);
  }
   
   selectAllusers() {
    this.showHistoric = true;
    this.showDropdow = false;
    this.selectedAccount = ''; 
    this.idPerfil = ''
    
    this.showDeleteLink=false
    this.requestAllUserHistoric()
  }
  showDeleteLink:Boolean=false

  idPerfil!: any;
  url: string = '';
  info: Array<any> = [];
  historicOfUser: Array<any> = [];
  days: Array<any> = [];
  cods: Array<any> = [];
 
  historicListRequest(idPerfil: number) {
    this.historicOfUser.splice(0, this.historicOfUser.length);
   this.hitoricService.historicListRequest(idPerfil)
      .subscribe((result: any) => {

        if (result?.data[idPerfil]!=undefined) {
          this.info = Object.values(result?.data[idPerfil]);
        this.info.forEach((element) => Object.values(element).forEach((e) => this.historicOfUser.push(e)));
        this.historicOfUser.map(film => film.nome = (this.selectedAccount))
        this.days = Object.keys(result?.data[idPerfil]);
        this.cods = Object.values(result?.data[idPerfil]);
        this.historic= this.historicOfUser;
      }else {
        this.historic= []
      }

      });
  }
  
  names: Array<string> = [];
  id: Array<number> = [];
  ids: Array<any> = [];
  arrayPorId: any = [];
  info2: Array<any> = [];

  requestAllUserHistoric() {
    this.historicOfUser.splice(0, this.historicOfUser.length);
    this.info2.splice(0, this.info2.length);

    this.hitoricService.requestAllUserHistoric()
      .subscribe((result: any) => {
          this.profiles.map(user => this.names.push(user.nome))
          this.profiles.forEach(user => this.id.push(user.id_perfis))

          if(result?.data==0) {
          }
          if (result!=undefined) {
            this.info = Object.values(result?.data);
          this.info.forEach((element) => Object.values(element).forEach(e => this.info2.push(e)))
          this.info2.forEach(dado => (Object.values(dado)).forEach(e =>{
              this.historicOfUser.push(e)}))
          this.historicOfUser.forEach(el => {
            for (let i = 0; i < this.id.length; i++) {
              if (el.id_perfil == this.id[i]) {
                el.nome = this.names[i]
              }
            }
          })
          this.historic= this.historicOfUser;
        } 
      
      });
  }
  
  showHistoric: boolean = true;
 
  historic: Array<any> = []
  showAlert: boolean = false;
  showConfirm: boolean = false;
  showButton: boolean = true; 
  textAlert: string = 'Deseja limpar o histórico?';

  cleanCancel() {
    this.blackOut = !this.blackOut
    this.showAlert = !this.showAlert;
    this.textAlert = 'Deseja limpar o histórico?';
    this.showButton = true;
    this.showDropdow = false;
  }
 
  cleanHistoric() {
    if (this.selectedAccount != '') {
      this.hitoricService.deleteAllHistoric(this.idPerfil).subscribe((e)=>{
        this.textAlert = 'Histórico apagado!';
        this.showButton = false;    
        this.historic.splice(0, this.historic.length);
      },
      (err) => {
        this.textAlert = 'Falha ao apagar o histórico.';
        this.showButton = false;    
      }
      );
    } 
  }

  showDropdow: boolean = false;
  
  showUsers() {
    this.showDropdow = !this.showDropdow;
    this.showAlert = false;
    this.blackOut = false
  }

  deleteIndividualContent(iDPerfil:number,id: number) {
    this.hitoricService.deleteIndividualIten(iDPerfil,id).subscribe((e)=>{      
    });
  }

  updateArray(ID:number){
    this.historic = this.historic.filter((dado) => dado.watchedreport_id
    !== ID)
  }

  @ViewChild('dropdown')
  dropdown!: ElementRef;
  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (this.dropdown.nativeElement.contains(event.target)) {
    } else {
      this.showDropdow = false;
    }
  }
 
  blackOut: boolean = false
  blackOutOn() {
    this.blackOut = !this.blackOut
  }
}

