package org.example.service.report;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.example.domain.Invoice;
import org.example.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

@Service
public class InvoiceReportService {

    public String exportReport(String reportFormat, Invoice invoice) throws FileNotFoundException, JRException {
        String path = "D:";
        List<Invoice> invoices = new ArrayList<>();
        invoices.add(invoice);
        File file = ResourceUtils.getFile("classpath:invoiceReport.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(invoices);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("createdBy", "Test");
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
        if (reportFormat.equalsIgnoreCase("html")) {
            JasperExportManager.exportReportToHtmlFile(jasperPrint, path + "\\invoices_" + invoice.getId() + ".html");
        }
        if (reportFormat.equalsIgnoreCase("pdf")) {
            JasperExportManager.exportReportToPdfFile(jasperPrint, path + "\\invoices_" + invoice.getId() + ".pdf");
        }

        return "report generated in path : " + path;
    }
}
