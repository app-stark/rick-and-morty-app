import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from './services/character';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  characters: any[] = [];
  loading = false;
  errorMessage = '';

  searchName = '';
  selectedStatus = '';

  constructor(
    private characterService: CharacterService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Componente inicializado');
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    console.log('Iniciando carga...');

    this.characterService
      .getCharacters(this.searchName.trim(), this.selectedStatus)
      .subscribe({
        next: (response) => {
          console.log('Respuesta recibida:', response);
          this.characters = response?.results ?? [];
          this.loading = false;
          this.cdr.detectChanges(); // 🔥 forzamos actualización
        },
        error: (error) => {
          console.error('Error detectado:', error);
          this.loading = false;
          this.cdr.detectChanges(); 
        }
      });
  }
}