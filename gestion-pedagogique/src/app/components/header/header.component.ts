import { Component } from '@angular/core';
import { faBell, faComment } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../data/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public icon = {
    faBell,
    faComment
  };

  constructor(public authService:AuthService){}
}
