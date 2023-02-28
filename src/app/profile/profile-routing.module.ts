import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ProfileSelectComponent } from './profile-select/profile-select.component';


const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'select',
    component: ProfileSelectComponent
  },
  {
    path: 'select/:manage',
    component: ProfileSelectComponent
  },
  {
    path: 'create',
    component: CreateComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
