package org.example.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BankAccount.
 */
@Entity
@Table(name = "bank_account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BankAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "address_line")
    private String addressLine;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "swift")
    private String swift;

    @Column(name = "correspondent_name")
    private String correspondentName;

    @Column(name = "correspondent_address")
    private String correspondentAddress;

    @Column(name = "correspondent_swift")
    private String correspondentSwift;

    @ManyToOne
    @JsonIgnoreProperties(value = { "address", "bankAccounts", "invoices" }, allowSetters = true)
    private Supplier supplier;

    @OneToMany(mappedBy = "bankAccount")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "bankAccount", "supplier", "customer" }, allowSetters = true)
    private Set<Invoice> invoices = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public BankAccount id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public BankAccount name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddressLine() {
        return this.addressLine;
    }

    public BankAccount addressLine(String addressLine) {
        this.setAddressLine(addressLine);
        return this;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public String getAccountNumber() {
        return this.accountNumber;
    }

    public BankAccount accountNumber(String accountNumber) {
        this.setAccountNumber(accountNumber);
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getBankName() {
        return this.bankName;
    }

    public BankAccount bankName(String bankName) {
        this.setBankName(bankName);
        return this;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getSwift() {
        return this.swift;
    }

    public BankAccount swift(String swift) {
        this.setSwift(swift);
        return this;
    }

    public void setSwift(String swift) {
        this.swift = swift;
    }

    public String getCorrespondentName() {
        return this.correspondentName;
    }

    public BankAccount correspondentName(String correspondentName) {
        this.setCorrespondentName(correspondentName);
        return this;
    }

    public void setCorrespondentName(String correspondentName) {
        this.correspondentName = correspondentName;
    }

    public String getCorrespondentAddress() {
        return this.correspondentAddress;
    }

    public BankAccount correspondentAddress(String correspondentAddress) {
        this.setCorrespondentAddress(correspondentAddress);
        return this;
    }

    public void setCorrespondentAddress(String correspondentAddress) {
        this.correspondentAddress = correspondentAddress;
    }

    public String getCorrespondentSwift() {
        return this.correspondentSwift;
    }

    public BankAccount correspondentSwift(String correspondentSwift) {
        this.setCorrespondentSwift(correspondentSwift);
        return this;
    }

    public void setCorrespondentSwift(String correspondentSwift) {
        this.correspondentSwift = correspondentSwift;
    }

    public Supplier getSupplier() {
        return this.supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public BankAccount supplier(Supplier supplier) {
        this.setSupplier(supplier);
        return this;
    }

    public Set<Invoice> getInvoices() {
        return this.invoices;
    }

    public void setInvoices(Set<Invoice> invoices) {
        if (this.invoices != null) {
            this.invoices.forEach(i -> i.setBankAccount(null));
        }
        if (invoices != null) {
            invoices.forEach(i -> i.setBankAccount(this));
        }
        this.invoices = invoices;
    }

    public BankAccount invoices(Set<Invoice> invoices) {
        this.setInvoices(invoices);
        return this;
    }

    public BankAccount addInvoice(Invoice invoice) {
        this.invoices.add(invoice);
        invoice.setBankAccount(this);
        return this;
    }

    public BankAccount removeInvoice(Invoice invoice) {
        this.invoices.remove(invoice);
        invoice.setBankAccount(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BankAccount)) {
            return false;
        }
        return id != null && id.equals(((BankAccount) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BankAccount{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", addressLine='" + getAddressLine() + "'" +
            ", accountNumber='" + getAccountNumber() + "'" +
            ", bankName='" + getBankName() + "'" +
            ", swift='" + getSwift() + "'" +
            ", correspondentName='" + getCorrespondentName() + "'" +
            ", correspondentAddress='" + getCorrespondentAddress() + "'" +
            ", correspondentSwift='" + getCorrespondentSwift() + "'" +
            "}";
    }
}
