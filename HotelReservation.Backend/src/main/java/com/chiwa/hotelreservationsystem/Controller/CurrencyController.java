package com.chiwa.hotelreservationsystem.Controller;

import com.chiwa.hotelreservationsystem.Model.Currency;
import com.chiwa.hotelreservationsystem.Service.ICurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CurrencyController {

    @Autowired
    private ICurrencyService currencyService;

    @GetMapping(value = "/currency/{id}")
    public Currency getCurrency(@PathVariable int id) {
        return currencyService.getCurrency(id);
    }

    @GetMapping(value = "/currencies")
    public List<Currency> getCurrencies() {
        return currencyService.getCurrencies();
    }

    @PostMapping(value = "/currency")
    public Currency createCurrency(@RequestBody Currency currency) {
        return currencyService.createCurrency(currency);
    }

    @PutMapping(value = "/currency")
    public Currency updateCurrency(@RequestBody Currency currency) {
        return currencyService.updateCurrency(currency);
    }

    @DeleteMapping(value = "/currency/{id}")
    public String deleteCurrency(@PathVariable int id) {
        return currencyService.deleteCurrency(id);
    }
}
