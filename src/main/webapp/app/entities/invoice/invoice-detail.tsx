import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './invoice.reducer';

export const InvoiceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const invoiceEntity = useAppSelector(state => state.invoice.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="invoiceDetailsHeading">
          <Translate contentKey="generatingInvoiceApp.invoice.detail.title">Invoice</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.id}</dd>
          <dt>
            <span id="number">
              <Translate contentKey="generatingInvoiceApp.invoice.number">Number</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.number}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="generatingInvoiceApp.invoice.date">Date</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.date ? <TextFormat value={invoiceEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="generatingInvoiceApp.invoice.description">Description</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.description}</dd>
          <dt>
            <span id="unitPrice">
              <Translate contentKey="generatingInvoiceApp.invoice.unitPrice">Unit Price</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.unitPrice}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="generatingInvoiceApp.invoice.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.quantity}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="generatingInvoiceApp.invoice.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.amount}</dd>
          <dt>
            <Translate contentKey="generatingInvoiceApp.invoice.supplier">Supplier</Translate>
          </dt>
          <dd>{invoiceEntity.supplier ? invoiceEntity.supplier.id : ''}</dd>
          <dt>
            <Translate contentKey="generatingInvoiceApp.invoice.customer">Customer</Translate>
          </dt>
          <dd>{invoiceEntity.customer ? invoiceEntity.customer.id : ''}</dd>
          <dt>
            <Translate contentKey="generatingInvoiceApp.supplier.bankAccount">Bank Account</Translate>
          </dt>
          <dd>{invoiceEntity.bankAccount ? invoiceEntity.bankAccount.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/invoice" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice/${invoiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InvoiceDetail;
