package com.example.webshopproject;

public class Product {

    String _id;
    String name;
    String category;
    String description;
    int price;
    String path;

    public Product(String _id, String name, String category, String description, int price, String path) {
        this._id = _id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.path = path;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
