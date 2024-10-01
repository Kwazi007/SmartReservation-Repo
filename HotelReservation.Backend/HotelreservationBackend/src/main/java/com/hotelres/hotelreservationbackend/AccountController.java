package com.hotelres.hotelreservationbackend;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    @RequestMapping
    public String account() {
        return "Hello World" ;
    }
}
