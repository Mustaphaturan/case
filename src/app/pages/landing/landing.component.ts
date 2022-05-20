import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user$ = this.authService.currentUser$;

  constructor(private authService: AuthenticationService) { }


  ngOnInit(): void {
  }

}
