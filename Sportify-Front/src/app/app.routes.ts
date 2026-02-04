import { Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CmsLoginComponent } from './cms-login/cms-login.component';
import { CmsHomeComponent } from './cms-home/cms-home.component';
import { authGuard } from './guards/auth.guard';
import { CmsPistasComponent } from './cms-pistas/cms-pistas.component';
import { CmsPistasModificarComponent } from './cms-pistas-modificar/cms-pistas-modificar.component';
import { CmsClubsComponent } from './cms-clubs/cms-clubs.component';
import { CmsClubsModificarComponent } from './cms-clubs-modificar/cms-clubs-modificar.component';
import { CmsUsuariosComponent } from './cms-usuarios/cms-usuarios.component';
import { CmsUsuariosModificarComponent } from './cms-usuarios-modificar/cms-usuarios-modificar.component';
import { CmsReservasComponent } from './cms-reservas/cms-reservas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { CondicionesComponent } from './condiciones/condiciones.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pista/:id', component: DetalleComponent },
  { path: 'perfil/:id', component: PerfilComponent },
  { path: 'login', component: LoginComponent},
  { path: 'cms', component: CmsLoginComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'privacidad', component: PrivacidadComponent},
  { path: 'condiciones', component: CondicionesComponent},
  { path: 'cms/home', component: CmsHomeComponent, canActivate: [authGuard] },
  { path: 'cms/pistas', component: CmsPistasComponent, canActivate: [authGuard] },
  { path: 'cms/clubs', component: CmsClubsComponent, canActivate: [authGuard] },
  { path: 'cms/usuarios', component: CmsUsuariosComponent, canActivate: [authGuard] },
  { path: 'cms/reservas', component: CmsReservasComponent, canActivate: [authGuard] },
  { path: 'cms/usuarios/crear', component: CmsUsuariosModificarComponent, canActivate: [authGuard] },
  { path: 'cms/usuarios/editar/:id', component: CmsUsuariosModificarComponent, canActivate: [authGuard] },
  { path: 'cms/clubs/crear', component: CmsClubsModificarComponent, canActivate: [authGuard] },
  { path: 'cms/clubs/editar/:id', component: CmsClubsModificarComponent, canActivate: [authGuard] },
  { path: 'cms/pistas/crear', component: CmsPistasModificarComponent, canActivate: [authGuard] },
  { path: 'cms/pistas/editar/:id', component: CmsPistasModificarComponent, canActivate: [authGuard] },
  { path: 'cms/**', redirectTo: 'cms' },
  { path: '**', redirectTo: '' }
];
