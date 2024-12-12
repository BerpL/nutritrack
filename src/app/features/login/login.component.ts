import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  // Lista de usuarios válidos
  validUsers = [
    { username: 'alejandro', password: 'casa1461' },
    { username: 'asistente', password: 'asistente1461' },
  ];

  constructor(private router: Router) {}

  login() {
    this.errorMessage = '';
    this.isLoading = true;

    setTimeout(() => {
      // Verificar si el usuario y la contraseña son válidos
      const userExists = this.validUsers.some(
        (user) =>
          user.username === this.username && user.password === this.password
      );

      if (userExists) {
        // Guardar el token y el nombre de usuario en localStorage
        localStorage.setItem('token', 'dummy-token'); // Token ficticio
        localStorage.setItem('username', this.username); // Guardar nombre de usuario

        this.isLoading = false; // Detener carga antes de redirigir
        this.router.navigate(['/main']); // Redirigir a /main
      } else {
        this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
        this.isLoading = false;
      }
    }, 2000); // Tiempo de carga simulado
  }
}
