import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DocumentsForDownloadComponent} from './documents-for-download.component';

/**
 * Created by Yuri Nikiforov.
 * Date: 05.10.2020
 * Time: 20:16
 */


const routes: Routes = [
    {
        path: '',
        component: DocumentsForDownloadComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentsForDownloadRoutingModule {

}
