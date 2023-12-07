package com.apirestful.crm;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@ComponentScan(basePackages = {"com.apirestful", "com.apirestful.configuration"})
public class ApirestfulApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApirestfulApplication.class, args);
    }
}
