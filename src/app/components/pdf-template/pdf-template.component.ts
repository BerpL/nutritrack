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

  getBackgroundAndIcon(alimento: string): { backgroundImage: string; icon: string } {
    const assetsMap: { [key: string]: { backgroundImage: string; icon: string } } = {
      almidon: { backgroundImage: '/img/almidon.svg', icon: '/img/icons/almidon-icon.svg' },
      verduras: { backgroundImage: '/img/verduras.svg', icon: '/img/icons/verduras-icon.svg' },
      frutas: { backgroundImage: '/img/frutas.svg', icon: '/img/icons/frutas-icon.svg' },
      lacteoSinGrasa: { backgroundImage: '/img/lacteo.svg', icon: '/img/icons/lacteos-icon.svg' },
      lacteoEntero: { backgroundImage: '/img/lacteo.svg', icon: '/img/icons/lacteos-icon.svg' },
      proteMuyMagra: { backgroundImage: '/img/proteMuyMagra.svg', icon: '/img/icons/proteMuyMagra-icon.svg' },
      proteMagra: { backgroundImage: '/img/proteMagra.svg', icon: '/img/icons/proteMagra-icon.svg' },
      proteSemiGrasa: { backgroundImage: '/img/proteSemiGrasa.svg', icon: '/img/icons/proteSemiGrasa-icon.svg' },
      grasas: { backgroundImage: '/img/grasas.svg', icon: '/img/icons/grasas-icon.svg' },
      sabrosura: { backgroundImage: '/img/azucar.svg', icon: '/img/icons/azucar-icon.svg' },
      azucar: { backgroundImage: '/img/azucar.svg', icon: '/img/icons/azucar-icon.svg' },
      rehidratante: { backgroundImage: '/img/rehidratante.svg', icon: '/img/icons/rehidratante-icon.svg' },
      bebida2: { backgroundImage: '/img/bebida2.svg', icon: '/img/icons/bebida2-icon.svg' },
      bebida3: { backgroundImage: '/img/bebida3.svg', icon: '/img/icons/bebida3-icon.svg' },
    };
  
    return assetsMap[alimento] || { backgroundImage: '/img/default.svg', icon: '/img/icons/default-icon.svg' };
  }  
}
