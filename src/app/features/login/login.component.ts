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

  // Usuario y contraseña de ejemplo
  validUsername = 'admin';
  validPassword = '1234567890';

  constructor(private router: Router) {}

  login() {
    this.errorMessage = '';
    this.isLoading = true;

    setTimeout(() => {
      if (
        this.username === this.validUsername &&
        this.password === this.validPassword
      ) {
        localStorage.setItem('token', 'dummy-token'); // Guardar token
        this.isLoading = false; // Detener carga antes de redirigir
        this.router.navigate(['/main']); // Redirigir a /main
      } else {
        this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
        this.isLoading = false;
      }
    }, 2000); // Tiempo de carga simulado
  }
}
