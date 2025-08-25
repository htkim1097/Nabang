package com.htkim.Nabang;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@Slf4j
@SpringBootApplication
public class NabangApplication {

	public static void main(String[] args) {
		SpringApplication.run(NabangApplication.class, args);
	}
}