import { Component, OnInit } from '@angular/core';
import { smoothScrollTo } from 'src/utils';

@Component({
  selector: 'app-rp-home',
  templateUrl: './rp-home.component.html',
  styleUrls: ['./rp-home.component.css']
})
export class RpHomeComponent implements OnInit {
  
    constructor() { }
  
    ngOnInit(): void {
      smoothScrollTo()
    }
}
