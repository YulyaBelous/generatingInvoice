package org.example.service.report;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.example.domain.Invoice;
import org.example.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvoiceReportService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public String generateReport() throws JRException {
        // Optional<Invoice> invoice = invoiceRepository.findById(id);
        List<Invoice> invoices = invoiceRepository.findAll();
        JasperReport jasperReport = JasperCompileManager.compileReport("invoiceReport.jrxml");

        // Get your data source
        JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(invoices);

        // Add parameters
        Map<String, Object> parameters = new HashMap<>();

        parameters.put("createdBy", "Websparrow.org");

        // Fill the report
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, jrBeanCollectionDataSource);

        // Export the report to a PDF file
        JasperExportManager.exportReportToPdfFile(jasperPrint, "invoiceReport.pdf");

        System.out.println("Done");

        return "Report successfully generated @path= " + "invoiceReport.jrxml";
    }
}
