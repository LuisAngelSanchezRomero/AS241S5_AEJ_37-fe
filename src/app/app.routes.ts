import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { GlmListComponent } from './feature/glm/glm-list/glm-list.component';
import { ImageListComponent } from './feature/pictocaption/image-list/image-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/glm', pathMatch: 'full' },
      { path: 'glm', component: GlmListComponent },
      { path: 'images', component: ImageListComponent }
    ]
  }
];
