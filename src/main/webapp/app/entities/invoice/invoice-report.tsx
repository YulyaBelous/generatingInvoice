import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, reportEntity } from './invoice.reducer';

export const InvoiceReport = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const invoiceEntity = useAppSelector(state => state.invoice.entity);
  const updateSuccess = useAppSelector(state => state.invoice.updateSuccess);

  const handleClose = () => {
    navigate('/invoice');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmReport = () => {
    dispatch(reportEntity(invoiceEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="invoiceReportDialogHeading">
        <Translate contentKey="generatingInvoiceApp.invoice.report.title">Confirm create report operation</Translate>
      </ModalHeader>
      <ModalBody id="generatingInvoiceApp.invoice.delete.question">
        <Translate contentKey="generatingInvoiceApp.invoice.report.question" interpolate={{ id: invoiceEntity.id }}>
          Are you sure you want to create report this Invoice?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-invoice" data-cy="entityConfirmDeleteButton" color="success" onClick={confirmReport}>
          <FontAwesomeIcon icon="book" />
          &nbsp;
          <Translate contentKey="generatingInvoiceApp.invoice.report.name">Report</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default InvoiceReport;
