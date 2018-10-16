import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LapComponent } from './lap/lap.component';
import { TimeComponent } from './time/time.component';

const routes: Routes = [
	{
		path: '',
		component: TimeComponent
	},
	{
		path: 'Lap',
		component: LapComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
