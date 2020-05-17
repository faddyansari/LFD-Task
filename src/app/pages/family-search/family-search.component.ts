import { AuthenticationService } from 'src/app/services/AuthenticationService';
import { DataService } from './../../services/DataService';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, first } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from './modal-content';
import { User } from 'src/app/model/userModel';
import { RcaViewComponent } from '../rca-view/rca-view.component';

@Component({
  selector: 'app-family-search',
  templateUrl: './family-search.component.html',
  styleUrls: ['./family-search.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class FamilySearchComponent implements OnInit {
  filter = new FormControl('');
  filteredItems = []
  family = [];
  currentUser: User;

  constructor(private modalService: NgbModal, private _dataService: DataService, private authenticationService: AuthenticationService) {
    this._dataService.getAllFamily().subscribe(response => {
      if (response && response.length) {
        this.family = response;
        this.assignCopy();
      }
    });
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {

  }


  editData(name, index) {
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this._dataService.editMember(receivedEntry, index).subscribe(res => {
        alert('Member name updated successfully!')

      })
    })
    let i = this.filteredItems.findIndex(ind => ind.name == name);
    this.filteredItems[i].name = name;
  }

  search() {
    const term = this.filter.value.toLowerCase();

    if (!term) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.family).filter(
      item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
    )
  }

  deleteData(name) {
    this._dataService.deleteMember(name).subscribe(res => {
      alert('Member deleted successfully!')
    })
    let index = this.filteredItems.findIndex(ind => ind.name == name);
    this.filteredItems.splice(index, 1);
    
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.family);
  }

  viewGraph(){
    const modalRef = this.modalService.open(RcaViewComponent);
  }
}
