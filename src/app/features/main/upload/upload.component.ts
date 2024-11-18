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
  test: any[] = [
    {
        "titulo": "Día 1 de entrenamiento",
        "subtitulo": "Gym y Lucha",
        "desayuno": {
            "name": "Desayuno",
            "hora": "09:00 am",
            "almidon": {
                "value": 4,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 1,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 5,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 3,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento1": {
            "name": "",
            "hora": "",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "mediaManana": {
            "name": "Media mañana",
            "hora": "11:30 am",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 2,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 3.5,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 1,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento2": {
            "name": "GYM",
            "hora": "01:00pm",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "almuerzo": {
            "name": "Almuerzo",
            "hora": "02:00 pm",
            "almidon": {
                "value": 7,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 3,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 1,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 2,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento3": {
            "name": "",
            "hora": "",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "mediaTarde": {
            "name": "Media tarde",
            "hora": "06:00 pm",
            "almidon": {
                "value": 1,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 1,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 1,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 1,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento4": {
            "name": "LUCHA",
            "hora": "07:30pm",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 4,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 1,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "cena": {
            "name": "Cena",
            "hora": "11:00 pm",
            "almidon": {
                "value": 6,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 3,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 2,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 3,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        }
    },
    {
        "titulo": "Día 2 de entrenamiento",
        "subtitulo": "Gym",
        "desayuno": {
            "name": "Desayuno",
            "hora": "09:00 am",
            "almidon": {
                "value": 4,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 1,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 5,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 3,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento1": {
            "name": "",
            "hora": "",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "mediaManana": {
            "name": "Media mañana",
            "hora": "11:30 am",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 2,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 1,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento2": {
            "name": "GYM",
            "hora": "01:00pm",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 1,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "almuerzo": {
            "name": "Almuerzo",
            "hora": "02:00 pm",
            "almidon": {
                "value": 6,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 4,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 2,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento3": {
            "name": "",
            "hora": "",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "mediaTarde": {
            "name": "Media tarde",
            "hora": "06:00 pm",
            "almidon": {
                "value": 1,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 1,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 3.5,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 1,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento4": {
            "name": "",
            "hora": "",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "cena": {
            "name": "Cena",
            "hora": "11:00 pm",
            "almidon": {
                "value": 6,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 3,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 1,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 2,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        }
    },
    {
        "titulo": "Día 3 de descanso",
        "subtitulo": "",
        "desayuno": {
            "name": "Desayuno",
            "hora": "09:00 am",
            "almidon": {
                "value": 4,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 5,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 2,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento1": {
            "name": "",
            "hora": "",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "mediaManana": {
            "name": "Media mañana",
            "hora": "11:30 am",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 1,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 1.8,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento2": {
            "name": "GYM",
            "hora": "01:00pm",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "almuerzo": {
            "name": "Almuerzo",
            "hora": "02:00 pm",
            "almidon": {
                "value": 6,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 4,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 2,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento3": {
            "name": "",
            "hora": "",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "mediaTarde": {
            "name": "Media tarde",
            "hora": "06:00 pm",
            "almidon": {
                "value": 1,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 2,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 1,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "entrenamiento4": {
            "name": "",
            "hora": "",
            "almidon": {
                "value": 0,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 0,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 0,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        },
        "cena": {
            "name": "Cena",
            "hora": "11:00 pm",
            "almidon": {
                "value": 6,
                "name": "Almidón"
            },
            "verduras": {
                "value": 0,
                "name": "Verduras"
            },
            "frutas": {
                "value": 0,
                "name": "Frutas"
            },
            "lacteoSinGrasa": {
                "value": 0,
                "name": "Lácteo sin grasa"
            },
            "lacteoEntero": {
                "value": 0,
                "name": "Lácteos enteros"
            },
            "proteMuyMagra": {
                "value": 0,
                "name": "Prote Muy Magra"
            },
            "proteMagra": {
                "value": 4,
                "name": "Prote Magra"
            },
            "proteSemiGrasa": {
                "value": 0,
                "name": "Prote Semi Grasa"
            },
            "grasas": {
                "value": 2,
                "name": "Grasas"
            },
            "sabrosura": {
                "value": 0,
                "name": "Sabrosura"
            },
            "azucar": {
                "value": 0,
                "name": "Azúcar"
            },
            "rehidratante": {
                "value": 0,
                "name": "Rehidratante"
            },
            "bebida2": {
                "value": 0,
                "name": "Agua"
            },
            "bebida3": {
                "value": 0,
                "name": "Chela"
            }
        }
    }
]
  ngAfterViewInit() {
    console.log(this.test)
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
            ];
  
            propertyRows.forEach((prop) => {
              pageData[key][prop.key] = {
                value: this.ensureNumber(worksheet.getCell(`${col}${prop.row}`).value), // Valor numérico
                name: worksheet.getCell(`A${prop.row}`).value?.toString().trim() || '', // Nombre dinámico desde la columna A
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
