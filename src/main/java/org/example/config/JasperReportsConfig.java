package org.example.config;

import javax.sql.DataSource;
import org.example.SimpleReportExporter;
import org.example.SimpleReportFiller;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JasperReportsConfig {

    @Bean
    public SimpleReportFiller reportFiller() {
        return new SimpleReportFiller();
    }

    @Bean
    public SimpleReportExporter reportExporter() {
        return new SimpleReportExporter();
    }
}
