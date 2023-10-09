import { Component } from '@angular/core';
import { AuthService } from '@app/data/services/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  constructor(public authService: AuthService) {}
}
