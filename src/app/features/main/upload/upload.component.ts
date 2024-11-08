import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import * as ExcelJS from 'exceljs';
import html2canvasPro from 'html2canvas-pro';
import jsPDF from 'jspdf'; // Asegúrate de importar jsPDF
import { PdfTemplateComponent } from '../../../components/pdf-template/pdf-template.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  imports: [CommonModule, NgClass, PdfTemplateComponent],
})
export class UploadComponent implements AfterViewInit {
  currentStep = 1;
  fileUploaded = false;
  isLoading = false;
  processingMessage = '';
  animatingIn = false;
  animatingOut = false;
  excelPagesData: any[] = [];
  singlePageData: any = {};
  data: any[] = []; 
  showReloadButton = false;
  isDownloading = false;
  test: any = [
    {
        "titulo": "Día 1 de entrenamiento",
        "subtitulo": "Baile",
        "intercambios": {
            "hora": "",
            "almidon": 0,
            "verduras": 0,
            "frutas": 0,
            "lacteoSinGrasa": 0,
            "lacteoEntero": 0,
            "proteMuyMagra": 0,
            "proteMagra": 0,
            "proteSemiGrasa": 0,
            "grasas": 0,
            "sabrosura": 0,
            "azucar": 0,
            "rehidratante": 0,
            "bebida2": 0,
            "bebida3": 0
        },
        "desayuno": {
            "hora": "9 am",
            "almidon": 2,
            "verduras": 0,
            "frutas": 0,
            "lacteoSinGrasa": 0,
            "lacteoEntero": 0,
            "proteMuyMagra": 0,
            "proteMagra": 0,
            "proteSemiGrasa": 3,
            "grasas": 1,
            "sabrosura": 0,
            "azucar": 0,
            "rehidratante": 0,
            "bebida2": 0,
            "bebida3": 0
        },
        "entrenamiento1": {
            "hora": "",
            "almidon": 0,
            "verduras": 0,
            "frutas": 0,
            "lacteoSinGrasa": 0,
            "lacteoEntero": 0,
            "proteMuyMagra": 0,
            "proteMagra": 0,
            "proteSemiGrasa": 0,
            "grasas": 0,
            "sabrosura": 0,
            "azucar": 0,
            "rehidratante": 0,
            "bebida2": 0,
            "bebida3": 0
        },
        "mediaManana": {
            "hora": "11:30 am",
            "almidon": 0,
            "verduras": 0,
            "frutas": 1,
            "lacteoSinGrasa": 1,
            "lacteoEntero": 0,
            "proteMuyMagra": 0,
            "proteMagra": 0,
            "proteSemiGrasa": 0,
            "grasas": 0,
            "sabrosura": 0,
            "azucar": 0,
            "rehidratante": 0,
            "bebida2": 0,
            "bebida3": 0
        },
        "entrenamiento2": {
            "hora": "",
            "almidon": 0,
            "verduras": 0,
            "frutas": 0,
            "lacteoSinGrasa": 0,
            "lacteoEntero": 0,
            "proteMuyMagra": 0,
            "proteMagra": 0,
            "proteSemiGrasa": 0,
            "grasas": 0,
            "sabrosura": 0,
            "azucar": 0,
            "rehidratante": 0,
            "bebida2": 0,
            "bebida3": 0
        },
        "almuerzo": {
            "hora": "2 pm",
            "almidon": 4,
            "verduras": 1,
            "frutas": 0,
            "lacteoSinGrasa": 0,
            "lacteoEntero": 0,
            "proteMuyMagra": 0,
            "proteMagra": 3,
            "proteSemiGrasa": 0,
            "grasas": 1,
            "sabrosura": 0,
            "azucar": 0,
            "rehidratante": 0,
            "bebida2": 0,
            "bebida3": 0
        },
        "entrenamiento3": {
            "hora": "",
            "almidon": 0,
            "verduras": 0,
            "frutas": 0,
            "lacteoSinGrasa": 0,
            "lacteoEntero": 0,
            "proteMuyMagra": 0,
            "proteMagra": 0,
            "proteSemiGrasa": 0,
            "grasas": 0,
            "sabrosura": 0,
            "azucar": 0,
            "rehidratante": 0,
            "bebida2": 0,
            "bebida3": 0
        },
        "mediaTarde": {
            "hora": "6 pm",
            "almidon": 3,
            "verduras": 0,
            "frutas": 1,
            "lacteoSinGrasa": 0,
            "lacteoEntero": 0,
            "proteMuyMagra": 0,
            "proteMagra": 0,
            "proteSemiGrasa": 0,
            "grasas": 0,
            "sabrosura": 0,
            "azucar": 0,
            "rehidratante": 0,
            "bebida2": 0,
            "bebida3": 0
        },
        "entrenamiento4": {
            "hora": "8 pm",
            "almidon": 0,
            "verduras": 0,
            "frutas": 0,
            "lacteoSinGrasa": 0,
            "lacteoEntero": 0,
            "proteMuyMagra": 0,
            "proteMagra": 0,
            "proteSemiGrasa": 0,
            "grasas": 0,
            "sabrosura": 0,
            "azucar": 0,
            "rehidratante": 0.5,
            "bebida2": 0,
            "bebida3": 0
        },
        "cena": {
            "hora": "11 pm",
            "almidon": 2,
            "verduras": 0,
            "frutas": 0,
            "lacteoSinGrasa": 0,
            "lacteoEntero": 0,
            "proteMuyMagra": 0,
            "proteMagra": 3,
            "proteSemiGrasa": 3,
            "grasas": 1,
            "sabrosura": 0,
            "azucar": 0,
            "rehidratante": 0,
            "bebida2": 0,
            "bebida3": 0
        }
    }
]
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  ngAfterViewInit() {
    // Este hook se asegura de que la vista está renderizada
  }

  formatTime(cellValue: any): string {
    if (cellValue instanceof Date) {
      const correctedTime = new Date(
        cellValue.getTime() + cellValue.getTimezoneOffset() * 60000 + 60000
      );
      const hours = correctedTime.getHours();
      const minutes = correctedTime.getMinutes();
      const period = hours >= 12 ? 'pm' : 'am';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes =
        minutes === 0 ? '' : `:${minutes.toString().padStart(2, '0')}`;
      return `${formattedHours}${formattedMinutes} ${period}`;
    }
    return cellValue || '';
  }

  ensureNumber(value: any): number {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue;
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === 'application/vnd.ms-excel' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      this.fileUploaded = true;
      this.readExcel(file);
    } else {
      this.fileUploaded = false;
      alert('Solo se permiten archivos Excel');
    }
  }

  async readExcel(file: File) {
    this.isLoading = true;
    this.excelPagesData = [];

    const reader = new FileReader();

    reader.onload = async (event: any) => {
      const buffer = event.target.result;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      workbook.eachSheet((worksheet) => {
        if (worksheet) {
          const pageData: any = {};

          pageData.titulo = worksheet.getCell('B1').value || '';
          pageData.subtitulo = worksheet.getCell('B2').value || '';

          const keys = [
            'intercambios',
            'desayuno',
            'entrenamiento1',
            'mediaManana',
            'entrenamiento2',
            'almuerzo',
            'entrenamiento3',
            'mediaTarde',
            'entrenamiento4',
            'cena',
          ];
          const columns = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

          keys.forEach((key, index) => {
            const col = columns[index];
            pageData[key] = {
              hora: this.formatTime(worksheet.getCell(`${col}3`).value),
              almidon: this.ensureNumber(worksheet.getCell(`${col}5`).value),
              verduras: this.ensureNumber(worksheet.getCell(`${col}6`).value),
              frutas: this.ensureNumber(worksheet.getCell(`${col}7`).value),
              lacteoSinGrasa: this.ensureNumber(
                worksheet.getCell(`${col}9`).value
              ),
              lacteoEntero: this.ensureNumber(
                worksheet.getCell(`${col}10}`).value
              ),
              proteMuyMagra: this.ensureNumber(
                worksheet.getCell(`${col}12}`).value
              ),
              proteMagra: this.ensureNumber(
                worksheet.getCell(`${col}13}`).value
              ),
              proteSemiGrasa: this.ensureNumber(
                worksheet.getCell(`${col}14}`).value
              ),
              grasas: this.ensureNumber(worksheet.getCell(`${col}16}`).value),
              sabrosura: this.ensureNumber(
                worksheet.getCell(`${col}18}`).value
              ),
              azucar: this.ensureNumber(worksheet.getCell(`${col}19}`).value),
              rehidratante: this.ensureNumber(
                worksheet.getCell(`${col}21}`).value
              ),
              bebida2: this.ensureNumber(worksheet.getCell(`${col}22}`).value),
              bebida3: this.ensureNumber(worksheet.getCell(`${col}23}`).value),
            };
          });

          this.excelPagesData.push(pageData);
        }
      });

      this.isLoading = false;
      console.log('Datos del Excel por página/hoja:', this.excelPagesData);
    };

    reader.readAsArrayBuffer(file);
  }

  processExcel() {
    this.isLoading = true;
    this.currentStep = 2;

    const processingSteps = [
      'Procesando datos de archivo excel',
      'Estableciendo formato de datos',
      'Estableciendo tema del pdf',
      'Generando archivo pdf',
    ];

    let stepIndex = 0;
    this.processingMessage = processingSteps[stepIndex];
    this.animatingIn = true;

    const interval = setInterval(() => {
      this.animatingOut = true;
      setTimeout(() => {
        stepIndex++;
        if (stepIndex < processingSteps.length) {
          this.processingMessage = processingSteps[stepIndex];
          this.animatingIn = true;
          this.animatingOut = false;
        } else {
          clearInterval(interval);
          this.isLoading = false;
          this.currentStep = 3;
        }
      }, 500);
    }, 2000);
  }

  async downloadPDF() {
    this.isDownloading = true; // Mostrar spinner de descarga
    const pdf = new jsPDF({
      orientation: 'p', // Mantiene la orientación vertical
      unit: 'px',       // Usa píxeles como unidad
      format: [1080, 1920] // Establece el tamaño en píxeles: 1080px x 1920px
    });
  
    for (let i = 0; i < this.excelPagesData.length; i++) {
      this.singlePageData = this.excelPagesData[i]; // Asigna un solo objeto de datos
  
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          html2canvasPro(this.pdfContent.nativeElement, {
            scale: 2,
            useCORS: true,
          })
            .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
              if (i > 0) pdf.addPage(); // Añadir una nueva página después de la primera
              pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
              resolve();
            })
            .catch((error) => {
              console.error('Error al generar el PDF:', error);
              reject(error);
            });
        }, 500); // Espera para asegurar la renderización completa
      });
    }
  
    pdf.save('Reporte_Nutricional.pdf');
    this.isDownloading = false; // Ocultar spinner de descarga
    this.showReloadButton = true; // Mostrar el botón de "Volver a cargar" después de la descarga
  }
  
  // Nueva función para reiniciar el proceso
  resetProcess() {
    this.currentStep = 1;
    this.fileUploaded = false;
    this.isDownloading = false;
    this.showReloadButton = false;
    this.fileInput.nativeElement.value = ''; // Reiniciar el input de archivo
  }
}
