import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageHeaderComponent } from './page-header.component';
import {DinamicPageHeaderComponent} from './dinamic-header/dinamic-page-header.component';

@NgModule({
    imports: [CommonModule, RouterModule, PageHeaderComponent, DinamicPageHeaderComponent],
    exports: [PageHeaderComponent, DinamicPageHeaderComponent]
})
export class PageHeaderModule {}
