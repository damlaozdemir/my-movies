import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html'
})
export class ConfirmationModalComponent {
  modalRef: BsModalRef;
  @Input() modalTitleText: string;
  @Input() modalBodyTextContent: string;
  @Input() modalDeclineText: string;
  @Input() modalAcceptText: string;
  @Output() success = new EventEmitter();
  @ViewChild('confirmationModal') confirmationModal: TemplateRef<any>;
  constructor(private modalService: BsModalService) { }

  submit(): void {
    this.success.emit(null);
  }

  openModal() {
    this.modalRef = this.modalService.show(this.confirmationModal, { backdrop: 'static', keyboard: false, class: 'modal-medium modal-dialog-centered' });
  }

}
