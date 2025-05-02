import { Component, OnInit, AfterViewInit, Input, ViewChild, Output} from '@angular/core';

import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements AfterViewInit {

  constructor() { }

  @Input() product: { nome: string; codigo: string } = { nome: 'sada', codigo: '1' };

  ngAfterViewInit() {
    if (this.product.codigo) {
      JsBarcode("#barcode", this.product.nome, {
        format: "CODE128",
        displayValue: false, // Remove o código abaixo do código de barras
        width: 4, // Controla a largura das barras
        height: 80,
      });
    }
  }
}
