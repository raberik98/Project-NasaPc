package com.example.webshopproject;

public class CartItem extends Product {
    private int quantity = 1;

    public CartItem(String _id, String name, String category, String description, int price, String path) {
        super(_id, name, category, description, price, path);
    }

    public CartItem(String _id, String name, String category, String description, int price, String path, int quantity) {
        super(_id, name, category, description, price, path);
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
