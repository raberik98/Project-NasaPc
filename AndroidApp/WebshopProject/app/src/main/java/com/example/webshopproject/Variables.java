package com.example.webshopproject;

import java.util.ArrayList;

public class Variables {

    //DON'T USE LOCALHOST OR 127.0.0.1, USE PRIVATE IPv4 ADDRESS INSTEAD
    private static final String backendUrl = "http://192.168.0.100:3000"; //backend is needed for requesting data from the database
    private static final String frontendUrl = "http://192.168.0.100:8080"; //frontend is needed for requesting images, because it's not stored in the backend

    public static String getBackendUrl() {
        return backendUrl;
    }

    public static String getFrontendUrl() {
        return frontendUrl;
    }

    public static ArrayList<Product> products;
    public static ArrayList<Product> filteredProducts;
    public static ArrayList<CartItem> cart = new ArrayList<>();
    public static ArrayList<Order> orders = new ArrayList<>();

    public static void addToCart(Product p) {
        boolean match = false;
        for(int i = 0; i<cart.size(); i++) {
            if(cart.get(i)._id.equals(p._id)) {
                cart.get(i).setQuantity(cart.get(i).getQuantity()+1);
                match = true;
                break;
            }
        }
        if(!match) {
            cart.add(new CartItem(p._id, p.name, p.category, p.description, p.price, p.path));
        }
    }

    public static int getCartItemsCost() {
        int sum = 0;
        for(int i = 0; i<cart.size(); i++) {
            sum += cart.get(i).price*cart.get(i).getQuantity();
        }
        return sum;
    }

}
