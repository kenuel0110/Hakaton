import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-route',
  standalone: false,
  templateUrl: './email-check.component.html',
  styleUrl: './email-check.component.css'
})

export class EmailCheck implements OnInit{
  constructor(private router: Router) {}
  ngOnInit(): void {
  }
  goToPage(): void {
    this.router.navigate(['/']);
  }
}
