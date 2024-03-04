import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnChanges {

  //Event initialization to open sidebar
  @Output() menuOpen = new EventEmitter<boolean>();
  @Output() onChangeLoc = new EventEmitter<string>();
  @Input() loc?: string;
  states = [
    {name: 'CZ', abbrev: 'cz'},
    {name: 'EN', abbrev: 'en'},
    {name: 'DE', abbrev: 'de'},
    {name: 'UA', abbrev: 'ua'},
    {name: 'RU', abbrev: 'ru'},
  ];
  selectForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  }

  // Change interface language when selected in footer component
  ngOnChanges() {
    this.initialSelect(this.loc);
    this.changeSelect();
  }

  // Initializing language selection form
  initialSelect(location: any) {
    this.selectForm = this.fb.group({
      selectedValue: location,
    });
  }

  // Change language selection
  changeSelect() {
    this.selectForm.get('selectedValue')?.valueChanges.subscribe(value => {
      this.changeLoc(value);
    });
  }

  //Function to open sidebar sidenav
  menuView() {
    this.menuOpen.emit(true);
  }

  //Function to change the interface language
  changeLoc(loc: string) {
    this.onChangeLoc.emit(loc);
  }

}
