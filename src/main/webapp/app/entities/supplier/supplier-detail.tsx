import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './supplier.reducer';

export const SupplierDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const supplierEntity = useAppSelector(state => state.supplier.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="supplierDetailsHeading">
          <Translate contentKey="generatingInvoiceApp.supplier.detail.title">Supplier</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="generatingInvoiceApp.supplier.name">Name</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.name}</dd>
          <dt>
            <span id="shortName">
              <Translate contentKey="generatingInvoiceApp.supplier.shortName">Short Name</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.shortName}</dd>
          <dt>
            <span id="fullName">
              <Translate contentKey="generatingInvoiceApp.supplier.fullName">Full Name</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.fullName}</dd>
          <dt>
            <span id="taxCode">
              <Translate contentKey="generatingInvoiceApp.supplier.taxCode">Tax Code</Translate>
            </span>
          </dt>
          <dd>{supplierEntity.taxCode}</dd>
          <dt>
            <Translate contentKey="generatingInvoiceApp.supplier.address">Address</Translate>
          </dt>
          <dd>{supplierEntity.address ? supplierEntity.address.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/supplier" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/supplier/${supplierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SupplierDetail;
