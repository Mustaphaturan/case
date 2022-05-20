import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SplitAreaDirective } from 'angular-split';
import { DataModel, EditDataModel } from 'src/app/models/data.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KontratService } from 'src/app/services/kontrat.service';
export const MY_DATA: DataModel[] = [
  {
    id: "1",
    kontrat: "2019",
    data: "1222",
    teklif: "Motor"
  },
  {
    id: "2",
    kontrat: "12020",
    data: "1",
    teklif: "Ferrari"
  },
  {
    id: "3",
    kontrat: "2021",
    data: "21",
    teklif: "Ford"
  },
];
export const ONLINE_DATA: DataModel[] = []
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  topSizes: number[] = [70, 30];
  bottomSizes: number[] = [40, 60];


  @ViewChild(MatSort) sort!: MatSort;
  shortColumns: string[] = ['id', 'kontrat', 'teklif', "data"];

  allColumns: string[] = ['id', 'kontrat', 'teklif', "data"];
  displayedColumns: string[] = ['id', 'kontrat', 'teklif', "data"];
  selectedColumns: string[] = [];
  dataSource = new MatTableDataSource(MY_DATA);
  dataSourceOline = new MatTableDataSource(ONLINE_DATA);

  get displayedColumnsBottom(): string[] {
    return [...this.displayedColumns, 'edit'];
  }

  constructor(private kontratService: KontratService) {
    kontratService.getKontrat().subscribe((el: any[]) => {
      console.log("fire store: ", el);
      this.dataSourceOline = new MatTableDataSource(el)
    }

    )
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  topDragEnd(e: any) {
    this.topSizes = e.sizes;
  }

  bottomDragEnd(e: any) {
    this.bottomSizes = e.sizes;
  }


  addNewRow() {
    this.dataSourceOline.data = [...this.dataSourceOline.data, { id: '', data: '', kontrat: '', teklif: '', edit: true }];
    console.log("addNewRow");
  }
  saveRow(row: DataModel) {
    row.edit = false;

    this.kontratService.addKontrat(row).then(res => {
      console.log("success");
    }).catch(err => {
      console.error("kontrat ekelenemedi :", err);
    });
  }
  removeRow(row: EditDataModel) {

    this.kontratService.removeKontrat(row).then(res => {
      console.log("success");
    }).catch(err => {
      console.error("kontrat ekelenemedi :", err);
    });
  }
  changeSort(e: any) {
    console.log("change:", e.target.value);
    const selectedColumn = e.target.value;
    this.changeSortedColumn(selectedColumn);
  }

  changeColumn(col: string, e: any) {

    const index = this.selectedColumns.indexOf(col);

    if (e.checked) {

      if (index < 0) {
        this.selectedColumns.push(col);
      }
    } else {
      const index = this.selectedColumns.indexOf(col);

      if (index >= 0) {
        this.selectedColumns.splice(index, 1);
      }
    }

    this.displayedColumns = this.allColumns.filter(el => !this.selectedColumns.some(s => s == el));
  }


  changeSortedColumn(selectedColumn: string) {
    const sortState: Sort = { active: selectedColumn, direction: 'asc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
}
