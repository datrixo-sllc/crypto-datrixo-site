import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyHoldingsComponent } from './my-holdings.component';

const routes: Routes = [
    {
        path: '',
        component: MyHoldingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyHoldingsRoutingModule {}
