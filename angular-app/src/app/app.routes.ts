import { Routes } from '@angular/router';
import { StudentsComponent} from './components/students/students.component';
import { StudentEditComponent } from './components/students-edit/students-edit.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


export const routes: Routes = [
    { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'edit/:id', component: StudentEditComponent },

  { path: '**', component: NotFoundComponent },
{ path: '404', component: NotFoundComponent } 
];
