/**
 * Created by Yuri Nikiforov.
 * Date: 09.05.2019
 * Time: 13:42
 */
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {

}
