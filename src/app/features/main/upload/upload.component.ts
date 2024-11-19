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
      const formattedMinutes = `:${minutes.toString().padStart(2, '0')}`
      return `${formattedHours.toString().padStart(2, '0')}${formattedMinutes} ${period}`;
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
  
          // Leer el título y subtítulo
          pageData.titulo = worksheet.getCell('B1').value || '';
          pageData.subtitulo = worksheet.getCell('B2').value || '';
  
          // Definir claves y columnas
          const keys = [
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
          const columns = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  
          // Agregar campo `name` a las claves principales
          keys.forEach((key, index) => {
            const col = columns[index];
            pageData[key] = {
              name: worksheet.getCell(`${col}4`).value?.toString().trim() || '', // Nombre dinámico desde la fila 4
              hora: this.formatTime(worksheet.getCell(`${col}3`).value),
            };
  
            // Agregar propiedades internas con nombres desde la columna A
            const propertyRows = [
              { key: 'almidon', row: 5 },
              { key: 'verduras', row: 6 },
              { key: 'frutas', row: 7 },
              { key: 'lacteoSinGrasa', row: 9 },
              { key: 'lacteoEntero', row: 10 },
              { key: 'proteMuyMagra', row: 12 },
              { key: 'proteMagra', row: 13 },
              { key: 'proteSemiGrasa', row: 14 },
              { key: 'grasas', row: 16 },
              { key: 'sabrosura', row: 18 },
              { key: 'azucar', row: 19 },
              { key: 'rehidratante', row: 21 },
              { key: 'bebida2', row: 22 },
              { key: 'bebida3', row: 23 },
              { key: 'bebida4', row: 24 },
              { key: 'bebida5', row: 25 },
            ];
  
            propertyRows.forEach((prop) => {
              let iconValue: any;
              const cellValue = worksheet.getCell(`L${prop.row}`).value;
              if (typeof cellValue === 'object' && cellValue !== null && 'text' in cellValue && 'hyperlink' in cellValue) {
                iconValue = cellValue as ExcelJS.CellHyperlinkValue;
              }              
              pageData[key][prop.key] = {
                value: this.ensureNumber(worksheet.getCell(`${col}${prop.row}`).value), // Valor numérico
                name: worksheet.getCell(`A${prop.row}`).value?.toString().trim() || '', // Nombre dinámico desde la columna A
                icon: iconValue?.text?.toString().trim() || '', // Icono dinámico desde la columna L
              };
            });
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
      format: [1080, 1920], // Establece el tamaño en píxeles: 1080px x 1920px
    });
  
    for (let i = 0; i < this.excelPagesData.length; i++) {
      this.singlePageData = this.excelPagesData[i]; // Asigna un solo objeto de datos
  
      await new Promise<void>((resolve, reject) => {
        setTimeout(async () => {
          try {
            // 1. Esperar a que las fuentes estén cargadas
            await document.fonts.ready;
  
            // 2. Verificar que las imágenes estén cargadas
            const images = Array.from(this.pdfContent.nativeElement.querySelectorAll('img'));
            await Promise.all(
              images.map((img: any) => {
                return new Promise<void>((resolveImage) => {
                  if (img.complete) {
                    resolveImage(); // Imagen ya cargada
                  } else {
                    img.onload = () => resolveImage();
                    img.onerror = () => resolveImage();
                  }
                });
              })
            );
  
            // 3. Asegurarse de que el DOM esté completamente renderizado
            await new Promise<void>((resolveAnimation) =>
              requestAnimationFrame(() => resolveAnimation())
            );            
  
            // 4. Capturar el contenido con html2canvasPro
            const canvas = await html2canvasPro(this.pdfContent.nativeElement, {
              scale: 2, // Mejor calidad
              useCORS: true,
            });
  
            // 5. Agregar la imagen capturada al PDF
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
            if (i > 0) pdf.addPage(); // Añadir una nueva página después de la primera
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
            resolve();
          } catch (error) {
            console.error('Error al capturar la página:', error);
            reject(error);
          }
        }, 500); // Espera adicional para garantizar la renderización
      });
    }
  
    // Descargar el PDF
    pdf.save('Reporte_Nutricional.pdf');
  
    // Actualizar estados después de la descarga
    this.isDownloading = false;
    this.showReloadButton = true; // Mostrar el botón de "Volver a cargar"
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
