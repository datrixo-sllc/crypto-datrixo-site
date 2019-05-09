/**
 * Created by Yuri Nikiforov.
 * Date: 09.05.2019
 * Time: 13:41
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {
  MatAutocompleteModule, MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule
} from '@angular/material';
import {FormsModule as FormModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule,
    ProfileRoutingModule,
    MatAutocompleteModule,
    FormModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}), MatButtonModule


  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {

}
