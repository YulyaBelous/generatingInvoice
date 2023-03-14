import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bank-account.reducer';

export const BankAccountDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const bankAccountEntity = useAppSelector(state => state.bankAccount.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bankAccountDetailsHeading">
          <Translate contentKey="generatingInvoiceApp.bankAccount.detail.title">BankAccount</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bankAccountEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="generatingInvoiceApp.bankAccount.name">Name</Translate>
            </span>
          </dt>
          <dd>{bankAccountEntity.name}</dd>
          <dt>
            <span id="addressLine">
              <Translate contentKey="generatingInvoiceApp.bankAccount.addressLine">Address Line</Translate>
            </span>
          </dt>
          <dd>{bankAccountEntity.addressLine}</dd>
          <dt>
            <span id="accountNumber">
              <Translate contentKey="generatingInvoiceApp.bankAccount.accountNumber">Account Number</Translate>
            </span>
          </dt>
          <dd>{bankAccountEntity.accountNumber}</dd>
          <dt>
            <span id="bankName">
              <Translate contentKey="generatingInvoiceApp.bankAccount.bankName">Bank Name</Translate>
            </span>
          </dt>
          <dd>{bankAccountEntity.bankName}</dd>
          <dt>
            <span id="swift">
              <Translate contentKey="generatingInvoiceApp.bankAccount.swift">Swift</Translate>
            </span>
          </dt>
          <dd>{bankAccountEntity.swift}</dd>
          <dt>
            <span id="correspondentName">
              <Translate contentKey="generatingInvoiceApp.bankAccount.correspondentName">Correspondent Name</Translate>
            </span>
          </dt>
          <dd>{bankAccountEntity.correspondentName}</dd>
          <dt>
            <span id="correspondentAddress">
              <Translate contentKey="generatingInvoiceApp.bankAccount.correspondentAddress">Correspondent Address</Translate>
            </span>
          </dt>
          <dd>{bankAccountEntity.correspondentAddress}</dd>
          <dt>
            <span id="correspondentSwift">
              <Translate contentKey="generatingInvoiceApp.bankAccount.correspondentSwift">Correspondent Swift</Translate>
            </span>
          </dt>
          <dd>{bankAccountEntity.correspondentSwift}</dd>
          <dt>
            <Translate contentKey="generatingInvoiceApp.bankAccount.supplier">Supplier</Translate>
          </dt>
          <dd>{bankAccountEntity.supplier ? bankAccountEntity.supplier.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bank-account" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bank-account/${bankAccountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BankAccountDetail;
