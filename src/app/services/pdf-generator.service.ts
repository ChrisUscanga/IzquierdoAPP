import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { CartItem } from '../models/cart.item.model';


@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  generateTicket(totalAmount: number, products?: CartItem[]) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const logo = new Image();
  
    logo.src = 'assets/logo.png'; // Reemplaza con la ruta de tu logo
  
    doc.addImage(logo, 'PNG', 15, 10, 18, 18);
    doc.text('Ticket de compra', 36, 15, { align: 'center' });
    doc.text('Fecha: ' + new Date().toLocaleDateString(), 36, 20, { align: 'center' });
  
    doc.text('Productos:', 15, 30);
    let y = 35;
    let total = 0;
    if (products) {
      products.forEach((product, index) => {
        doc.text(`${index + 1}. ${product.name} - ${product.quantity} unid.`, 20, y);
        y += 5;
        total += product.quantity;
      });
      doc.text(`Total de productos: ${total}`, 20, y);
      y += 5;
    }
  
    doc.text('Total a pagar: $' + totalAmount.toFixed(2), 20, y);
    y += 5;
  
    doc.save('ticket.pdf');
  }
}

