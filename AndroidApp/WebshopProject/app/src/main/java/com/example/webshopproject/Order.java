package com.example.webshopproject;

import java.util.ArrayList;

public class Order {

    private String ID;
    private ArrayList<String> products; //It only stores the quantity and name as String
    private int cost;

    public Order(String ID, ArrayList<String> products, int cost) {
        this.ID = ID;
        this.products = products;
        this.cost = cost;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public ArrayList<String> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<String> products) {
        this.products = products;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }
}
