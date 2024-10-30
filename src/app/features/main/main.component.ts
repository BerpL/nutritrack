import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class MainComponent implements OnInit {
  username = 'admin'; // Nombre de usuario estático
  theme = 'winter'; // Tema inicial
  currentYear: number = new Date().getFullYear();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Cargar el tema desde localStorage
    const savedTheme = localStorage.getItem('theme');
    this.theme = savedTheme ? savedTheme : 'winter';
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  // Cambiar entre temas
  toggleTheme() {
    this.theme = this.theme === 'winter' ? 'night' : 'winter';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Mostrar el modal de confirmación
  confirmLogout() {
    const modal = document.getElementById('logout-modal') as HTMLDialogElement;
    if (modal) modal.showModal();
  }

  // Cerrar el modal
  closeModal() {
    const modal = document.getElementById('logout-modal') as HTMLDialogElement;
    if (modal) modal.close();
  }
}
