/**
 * Created by Yuri Nikiforov.
 * Date: 09.05.2019
 * Time: 17:21
 */
import {RouterModule, Routes} from '@angular/router';
import {InvestComponent} from './invest.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: InvestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestRoutingModule {

}
