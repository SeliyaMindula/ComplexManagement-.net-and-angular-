import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresComponent } from './stores/stores.component';
import { TableComponent } from './table/table.component';
import { EditstoresComponent } from './editstores/editstores.component';
const routes: Routes = [
  { path: 'stores', component: StoresComponent },
  { path: '', component: TableComponent },
  { path: 'edit-store/:id', component: EditstoresComponent}


];
   
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
