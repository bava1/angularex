import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { contactList } from './contactList';
import { Contact } from './Contact';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit, AfterViewInit {

  //Display contact list. Used table from Angular Material
  contactList: Contact[] = contactList;
  dataSource = new MatTableDataSource(contactList);
  displayedColumns: string[] = ['name'];
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  value = '';

  constructor() { }

  ngAfterViewInit() {
    // Activating the contact list paginator
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
  }
  // Filtering contacts in the list
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // Cleaning the filter
  clearFilter() {
    this.dataSource.filter = '';
    this.value = '';
  }

}
