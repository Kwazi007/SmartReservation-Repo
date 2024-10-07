package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.Currency;
import com.chiwa.hotelreservationsystem.Repo.CurrencyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrencyService implements ICurrencyService {

    @Autowired
    private CurrencyRepo currencyRepo;

    @Override
    public Currency getCurrency(int id) {
        return currencyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Currency not found"));
    }

    @Override
    public List<Currency> getCurrencies() {
        return currencyRepo.findAll();
    }

    @Override
    public Currency createCurrency(Currency currency) {
        currencyRepo.save(currency);
        return currency;
    }

    @Override
    public Currency updateCurrency(Currency currency) {
        currencyRepo.save(currency);
        return currency;
    }

    @Override
    public String deleteCurrency(int id) {
        currencyRepo.deleteById(id);
        return "Currency Has Been Deleted";
    }
}
