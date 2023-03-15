import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'reactstrap';

export const InvoiceReport = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/invoice');
  };

  return (
    <Modal isOpen toggle={handleClose}>
      {' '}
    </Modal>
  );
};

export default InvoiceReport;
