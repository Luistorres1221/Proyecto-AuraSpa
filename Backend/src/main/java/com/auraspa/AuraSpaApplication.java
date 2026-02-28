package com.auraspa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AuraSpaApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuraSpaApplication.class, args);
    }

}
