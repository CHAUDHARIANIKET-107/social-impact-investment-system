import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-demographic-data',
  templateUrl: './demographic-data.component.html',
  styleUrls: ['./demographic-data.component.css']
})
export class DemographicDataComponent {
  excelData: any[] = [];
  columns: string[] = [
    'Name',
    'Age',
    'Sex or Gender',
    'Race and Ethnicity',
    'Marital Status',
    'Education Level',
    'Income Level',
    'Occupation',
    'Place of Residence',
    'Nationality',
    'Religion',
    'Language Spoken',
    'Household Size'
  ];
  agGridColumns = this.columns.map(col => ({ headerName: col, field: col, sortable: true, filter: true, resizable: true }));
  selectedColumn: string = '';
  pieData: any = null;
  isDragActive: boolean = false;

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) return;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const [header, ...rows] = rawData;
      this.columns = header as string[];
      this.agGridColumns = this.columns.map(col => ({ headerName: col, field: col, sortable: true, filter: true, resizable: true }));
      this.excelData = rows.map(row => {
        const obj: any = {};
        (row as any[]).forEach((cell, idx) => {
          obj[this.columns[idx]] = cell;
        });
        return obj;
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = false;
    if (event.dataTransfer && event.dataTransfer.files.length) {
      this.onFileChange({ target: { files: event.dataTransfer.files } });
    }
  }

  onColumnSelect() {
    if (!this.selectedColumn) return;
    const colIdx = this.columns.indexOf(this.selectedColumn);
    const valueCount: { [key: string]: number } = {};
    this.excelData.forEach(row => {
      const value = row[colIdx];
      if (value !== undefined && value !== null) {
        valueCount[value] = (valueCount[value] || 0) + 1;
      }
    });
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#8BC34A', '#E91E63', '#00BCD4', '#CDDC39', '#FFC107', '#795548', '#607D8B', '#F44336', '#3F51B5', '#009688', '#9C27B0', '#2196F3', '#FFEB3B'
    ];
    const legendColors = Object.keys(valueCount).map((_, i) => colors[i % colors.length]);
    this.pieData = {
      labels: Object.keys(valueCount),
      datasets: [{
        data: Object.values(valueCount),
        backgroundColor: legendColors,
        borderColor: '#fff',
        borderWidth: 2
      }]
    };
  }
}
