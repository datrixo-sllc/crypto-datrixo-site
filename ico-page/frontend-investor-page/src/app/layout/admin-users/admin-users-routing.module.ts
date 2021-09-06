import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminUsersComponent} from './admin-users.component';

/**
 * Created by Yuri Nikiforov.
 * Date: 05.10.2020
 * Time: 20:16
 */


const routes: Routes = [
    {
        path: '',
        component: AdminUsersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminUsersRoutingModule {

}
