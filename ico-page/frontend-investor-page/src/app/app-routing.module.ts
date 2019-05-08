import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';

// import { ComposeMessageComponent } from './compose-message/compose-message.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// import { AuthGuard } from './auth/auth.guard';
// import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const appRoutes: Routes = [
/*
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
*/
  {
    path: 'my-holdings',
    loadChildren: './my-holdings/my-holdings.module#MyHoldingsModule',
    data: { preload: true },
    // canLoad: [AuthGuard]
  },
  /*{
    path: 'invest',
    loadChildren: './invest/invest.module#InvestModule',
    // canLoad: [AuthGuard]
  },*/
  /*{
    path: 'investor-profile',
    loadChildren: './investor-profile/investor-profile.module#InvestorProfileModule',
    data: { preload: true },
    // canLoad: [AuthGuard]
  },*/

  {
    path: '',
    loadChildren: './my-holdings/my-holdings.module#MyHoldingsModule',
    data: { preload: true },
    // canLoad: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
