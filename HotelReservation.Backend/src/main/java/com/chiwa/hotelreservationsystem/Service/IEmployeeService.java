package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.Employee;
import com.chiwa.hotelreservationsystem.Model.Payment;

import java.util.List;

public interface IEmployeeService {
    public Employee getEmployee(int id);
    public List<Employee> getEmployees();
    public Employee createEmployee(Employee employee);
    public Employee updateEmployee(Employee employee);
    public String deleteEmployee(int id);
}
