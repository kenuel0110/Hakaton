import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-route',
  standalone: false,
  templateUrl: './empty-route.component.html',
  styleUrl: './empty-route.component.css'
})

export class EmptyPage implements OnInit{
  constructor(private router: Router) {}
  ngOnInit(): void {
  }
  goToPage(): void {
    this.router.navigate(['/']);
  }
}
