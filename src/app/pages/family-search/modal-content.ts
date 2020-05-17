import { FormControl } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Edit:</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div class="form-group form-inline">
        Edit {{name}}: <input class="form-control ml-2" type="text" [formControl]="memberName" placeholder="Edit Name.." />
    </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="UpdateName()" [disabled]="!memberName.value">Update</button>
    </div>
  `
})
export class ModalContent {
    @Input() name;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    memberName = new FormControl('');
    constructor(public activeModal: NgbActiveModal) {
    }

    UpdateName() {
        this.passEntry.emit(this.memberName.value);
        this.activeModal.close('Close click')
    }
}