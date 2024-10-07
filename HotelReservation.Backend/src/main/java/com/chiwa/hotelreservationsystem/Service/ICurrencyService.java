package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.Currency;

import java.util.List;

public interface ICurrencyService {
    public Currency getCurrency(int id);
    public List<Currency> getCurrencies();
    public Currency createCurrency(Currency currency);
    public Currency updateCurrency(Currency currency);
    public String deleteCurrency(int id);
}
