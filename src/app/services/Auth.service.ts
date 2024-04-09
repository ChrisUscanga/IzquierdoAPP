import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuario';
  currentUser: any; // Almacena los datos del usuario actual
  private userSubject = new BehaviorSubject<{ idUsuario: number | undefined, correoElectronico: string | undefined; contrasenia: string | undefined; nombreCompleto: string | undefined; } | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  setUser(user: any) {
    this.currentUser = user; // Almacena los datos del usuario
    this.userSubject.next(user); // Emite los datos del usuario a todos los suscriptores
    console.log('Datos guardados en setUser:', user); // Imprime los datos en la consola
  }

  getUser() {
    console.log('Datos recuperados de getUser:', this.currentUser); // Imprime los datos en la consola
    return this.currentUser; // Devuelve los datos del usuario
  }

  login(email: string, password: string) {
    this.http.get<any[]>(`${this.apiUrl}/list`).subscribe((usuarios) => {
      console.log('Petición GET realizada a usuarios/list', usuarios); // Mensaje de consola
      const usuario = usuarios.find(usuario => usuario.correoElectronico === email && usuario.contrasenia === password);
      if (usuario) {
        // Si el usuario existe y la contraseña es correcta, redirige a la página de inicio.
        this.router.navigate(['/home']);
        // Almacena el usuario en el almacenamiento local.
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.setUser(usuario); // Almacena los datos del usuario en el servicio
      } else {
        // Si el usuario no existe o la contraseña es incorrecta, muestra un mensaje de error.
        alert('Correo electrónico o contraseña incorrectos');
      }
    }, (error) => {
      // Maneja cualquier error que pueda ocurrir durante la solicitud HTTP.
      console.error(error);
      alert('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    });
  }

  register(email: string, password: string, nombreCompleto: string) {
    const usuario = { correoElectronico: email, contrasenia: password, nombreCompleto };
    this.http.post(`${this.apiUrl}/create`, usuario).subscribe(() => {
      console.log('Petición POST realizada a /usuario/create', usuario); // Mensaje de consola
      alert('Usuario creado con éxito');
      // Redirige a la página de inicio después de la creación exitosa del usuario.
      this.router.navigate(['/home']);
      this.setUser(usuario); // Almacena los datos del usuario en el servicio
    }, (error) => {
      console.error(error);
      alert('Ocurrió un error al intentar crear el usuario. Por favor, inténtalo de nuevo más tarde.');
    });
  }

 
  update(email: string, password: string, nombreCompleto: string) {
    // Recupera el usuario del almacenamiento local.
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.idUsuario) {
      const updatedUsuario = { idUsuario: usuario.idUsuario, correoElectronico: email, contrasenia: password, nombreCompleto };
      // Realiza una petición PUT a /usuario/update/{id} con los datos actualizados del usuario.
      this.http.put(`${this.apiUrl}/update/${usuario.idUsuario}`, updatedUsuario).subscribe(() => {
        console.log('Petición PUT realizada a /usuario/update/{id}', updatedUsuario); // Mensaje de consola
        alert('Usuario actualizado con éxito');
        // Actualiza el usuario en el almacenamiento local.
        localStorage.setItem('usuario', JSON.stringify(updatedUsuario));
        this.setUser(updatedUsuario); // Almacena los datos del usuario en el servicio
      }, (error) => {
        console.error(error);
        alert('Ocurrió un error al intentar actualizar el usuario. Por favor, inténtalo de nuevo más tarde.');
      });
    } else {
      console.error('No se pudo recuperar el ID del usuario del almacenamiento local');
    }
  }
}