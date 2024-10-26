import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-template.component.html',
  styleUrls: ['./pdf-template.component.scss'],
})
export class PdfTemplateComponent {
  @Input() data: any = {};
  displayedIndex = 0;
  // Define un objeto para mapear cada valor a un color específico
  colorMap: { [key: string]: string } = {
    almidon: '#FFD700', // Color amarillo para almidón
    verduras: '#32CD32', // Color verde para verduras
    frutas: '#FF6347', // Color rojo para frutas
    lacteoSinGrasa: '#87CEEB', // Color azul claro para lácteo sin grasa
    lacteoEntero: '#4682B4', // Color azul oscuro para lácteo entero
    proteMuyMagra: '#D2691E', // Color marrón para proteína muy magra
    proteMagra: '#8B4513', // Color marrón oscuro para proteína magra
    proteSemiGrasa: '#A52A2A', // Otro marrón para proteína semi grasa
    grasas: '#FFA07A', // Color salmón para grasas
    sabrosura: '#FF69B4', // Color rosa para sabrosura
    azucar: '#FF4500', // Color naranja para azúcar
    rehidratante: '#00CED1', // Color turquesa para rehidratante
    bebida2: '#8A2BE2', // Color púrpura para bebida 2
    bebida3: '#DA70D6', // Color violeta para bebida 3
  };
  getMealName(mealKey: string): string {
    const mealNames: any = {
      desayuno: 'Desayuno',
      mediaManana: 'Media mañana',
      almuerzo: 'Almuerzo',
      mediaTarde: 'Media tarde',
      cena: 'Cena',
    };
    return mealNames[mealKey] || mealKey;
  }  

  getFilteredProperties(meal: any): string[] {
    return Object.keys(meal).filter((key) => meal[key] !== 0 && key !== 'hora');
  }

  hasValues(meal: any): boolean {
    return Object.keys(meal).some((key) => meal[key] !== 0 && key !== 'hora');
  }

  getDayFromTitle(title: string | undefined): string {
    if (!title) return ''; // Si `title` es undefined, devolver cadena vacía
    const dayMatch = title.match(/Día \d+/i); // Buscar "Día n"
    return dayMatch ? dayMatch[0] : title;
  }

  getTrainingFromTitle(title: string | undefined): string {
    return title ? 'de entrenamiento' : ''; // Si `title` es undefined, devolver cadena vacía
  }

  incrementDisplayedIndex(): boolean {
    this.displayedIndex++;
    return true;
  }

  // Función para obtener el color según el nombre de la propiedad
  getBackgroundColor(prop: string): string {
    return this.colorMap[prop] || '#FFFFFF'; // Color blanco por defecto
  }
}
