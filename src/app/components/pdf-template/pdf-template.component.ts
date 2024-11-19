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

  // Obtener el nombre de la comida o la clave si no existe el nombre
  getMealName(mealKey: string, page: any): string {
    return page[mealKey]?.name || mealKey;
  }

  // Obtener las propiedades filtradas de una comida
  getFilteredProperties(meal: any): string[] {
    return Object.keys(meal).filter(
      (key) => meal[key]?.value !== 0 && key !== 'hora' && key !== 'name'
    );
  }

  isSingleWord(text: string): boolean {
    return text.trim().split(' ').length === 1; // Verifica si hay solo una palabra
  }

  getFirstWord(text: string): string {
    return text.split(' ')[0] || ''; // Retorna la primera palabra
  }

  getSecondWord(text: string): string {
    const words = text.split(' ');
    return words.length > 1 ? words[1] : ''; // Retorna la segunda palabra si existe
  }

  // Verificar si una comida tiene valores
  hasValues(meal: any): boolean {
    return Object.keys(meal).some(
      (key) => meal[key]?.value !== 0 && key !== 'hora' && key !== 'name'
    );
  }

  // Obtener "Día X" desde el título
  getDayFromTitle(title: string | undefined): string {
    if (!title) return '';
    const dayMatch = title.match(/Día \d+/i); // Busca "Día X" en el título
    return dayMatch ? dayMatch[0] : '';
  }

  // Obtener la descripción desde el título (por ejemplo, "de descanso" o "de entrenamiento")
  getTrainingFromTitle(title: string | undefined): string {
    if (!title) return '';
    const descriptionMatch = title.replace(/Día \d+/i, '').trim(); // Remueve "Día X" y extrae el resto
    return descriptionMatch;
  }

  incrementDisplayedIndex(): boolean {
    this.displayedIndex++;
    return true;
  }

  // Obtener el fondo y el icono para un alimento
  getBackgroundAndIcon(alimento: string): {
    backgroundImage: string;
    icon: string;
  } {
    const assetsMap: {
      [key: string]: { backgroundImage: string; icon: string };
    } = {
      almidon: {
        backgroundImage: '/img/almidon.svg',
        icon: '/img/icons/almidon-icon.svg',
      },
      verduras: {
        backgroundImage: '/img/verduras.svg',
        icon: '/img/icons/verduras-icon.svg',
      },
      frutas: {
        backgroundImage: '/img/frutas.svg',
        icon: '/img/icons/frutas-icon.svg',
      },
      lacteoSinGrasa: {
        backgroundImage: '/img/lacteo.svg',
        icon: '/img/icons/lacteos-icon.svg',
      },
      lacteoEntero: {
        backgroundImage: '/img/lacteo.svg',
        icon: '/img/icons/lacteos-icon.svg',
      },
      proteMuyMagra: {
        backgroundImage: '/img/proteMuyMagra.svg',
        icon: '/img/icons/proteMuyMagra-icon.svg',
      },
      proteMagra: {
        backgroundImage: '/img/proteMagra.svg',
        icon: '/img/icons/proteMagra-icon.svg',
      },
      proteSemiGrasa: {
        backgroundImage: '/img/proteSemiGrasa.svg',
        icon: '/img/icons/proteSemiGrasa-icon.svg',
      },
      grasas: {
        backgroundImage: '/img/grasas.svg',
        icon: '/img/icons/grasas-icon.svg',
      },
      sabrosura: {
        backgroundImage: '/img/azucar.svg',
        icon: '/img/icons/azucar-icon.svg',
      },
      azucar: {
        backgroundImage: '/img/azucar.svg',
        icon: '/img/icons/azucar-icon.svg',
      },
      rehidratante: {
        backgroundImage: '/img/rehidratante.svg',
        icon: '/img/icons/rehidratante-icon.svg',
      },
      bebida2: {
        backgroundImage: '/img/bebida2.svg',
        icon: '/img/icons/bebida2-icon.svg',
      },
      bebida3: {
        backgroundImage: '/img/bebida3.svg',
        icon: '/img/icons/bebida3-icon.svg',
      },
      bebida4: {
        backgroundImage: '/img/bebida4.svg',
        icon: '/img/icons/bebida4-icon.svg',
      },
      bebida5: {
        backgroundImage: '/img/bebida5.svg',
        icon: '/img/icons/bebida5-icon.svg',
      },
    };

    return (
      assetsMap[alimento] || {
        backgroundImage: '/img/default.svg',
        icon: '/img/icons/default-icon.svg',
      }
    );
  }

  // Obtener la lista de comidas y entrenamientos en orden
  getOrderedMealsAndTrainings(
    page: any
  ): { key: string; isTraining: boolean }[] {
    const meals = ['desayuno', 'mediaManana', 'almuerzo', 'mediaTarde', 'cena'];
    const trainings = Object.keys(page).filter((key) =>
      key.startsWith('entrenamiento')
    );
    const result: { key: string; isTraining: boolean }[] = [];

    let trainingIndex = 0;
    meals.forEach((meal) => {
      if (page[meal] && this.getFilteredProperties(page[meal]).length > 0) {
        result.push({ key: meal, isTraining: false });
      }
      if (trainings[trainingIndex] && page[trainings[trainingIndex]]) {
        result.push({ key: trainings[trainingIndex], isTraining: true });
        trainingIndex++;
      }
    });

    while (trainingIndex < trainings.length) {
      result.push({ key: trainings[trainingIndex], isTraining: true });
      trainingIndex++;
    }

    return result;
  }

  // Formatear los detalles de las comidas
  getFormattedDetailMeal(item: any): string {
    if (!item) {
      return '';
    }

    const liquids = [
      'rehidratante',
      'bebida2',
      'bebida3',
      'bebida4',
      'bebida5',
    ];
    const solidEntries: string[] = [];
    const liquidEntries: string[] = [];

    for (const key in item) {
      if (item[key]?.value && item[key]?.value > 0) {
        const value = item[key]?.value;
        const name = item[key]?.name?.toLowerCase() ?? '';
        if (liquids.includes(key)) {
          liquidEntries.push(`${value}L de \n${name}`);
        } else {
          solidEntries.push(`${value}g de ${name}`);
        }
      }
    }

    const combinedEntries = [...liquidEntries, ...solidEntries];
    return combinedEntries.join('\n+\n');
  }

  // Filtrar solo los elementos no entrenamiento
  getNonTrainingItems(page: any): { key: string; isTraining: boolean }[] {
    return this.getOrderedMealsAndTrainings(page).filter(
      (item) => !item.isTraining
    );
  }

  // Obtener el índice correcto para los elementos no entrenamiento
  getNonTrainingIndex(key: string, page: any): number {
    const nonTrainingItems = this.getNonTrainingItems(page);
    return nonTrainingItems.findIndex((item) => item.key === key);
  }
}
