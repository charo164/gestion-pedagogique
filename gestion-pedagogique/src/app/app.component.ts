import { Component, OnInit } from '@angular/core';
import { AuthService } from './data/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'gestion-pedagogique';

  constructor(public authService: AuthService) {}

  ngOnInit() {}
}
