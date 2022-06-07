package com.example.webshopproject;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;

public class Cart extends AppCompatActivity {

    BottomNavigationView bnv;
    public static TextView tc;
    public static ListView listView;
    public static Button  placeOrder;
    public static ImageView cartImage;
    public static TextView cartText;

    public ArrayList<Product> products;
    public ArrayList<Product> filteredProducts;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cart);

        bnv = findViewById(R.id.bottom_navigation);
        bnv.setSelectedItemId(R.id.cart);
        listView = findViewById(R.id.listView);
        tc = findViewById(R.id.text_cost);
        placeOrder = findViewById(R.id.btn_place_order);
        cartImage = findViewById(R.id.cartImage);
        cartText = findViewById(R.id.cartText);

        products = new ArrayList<>();
        filteredProducts = new ArrayList<>();

        //Change the built in bottom nav color
        getWindow().setNavigationBarColor(getResources().getColor(R.color.primary));

        if(Variables.cart.size() == 0) {
            placeOrder.setVisibility(View.INVISIBLE);
            tc.setVisibility(View.INVISIBLE);

            cartImage.setVisibility(View.VISIBLE);
            cartText.setVisibility(View.VISIBLE);
        } else {
            placeOrder.setVisibility(View.VISIBLE);
            tc.setVisibility(View.VISIBLE);

            cartImage.setVisibility(View.INVISIBLE);
            cartText.setVisibility(View.INVISIBLE);
        }

        bnv.setOnNavigationItemSelectedListener(item -> {
            SharedPreferences data = getSharedPreferences("webshop", MODE_PRIVATE);
            switch (item.getItemId()) {
                case R.id.products:
                    startActivity(new Intent(getApplicationContext(), MainActivity.class));
                    overridePendingTransition(0,0);
                    return true;
                case R.id.profile:
                    if(data.getBoolean("isLoggedIn", false)) {
                        startActivity(new Intent(getApplicationContext(), Profile.class));
                    } else {
                        startActivity(new Intent(getApplicationContext(), Login.class));
                    }
                    overridePendingTransition(0,0);
                    return true;
                case R.id.orders:
                    if(data.getBoolean("isLoggedIn", false)) {
                        startActivity(new Intent(getApplicationContext(), Orders.class));
                    } else {
                        startActivity(new Intent(getApplicationContext(), OrdersNotLoggedIn.class));
                    }
                    overridePendingTransition(0,0);
                    return true;
                case R.id.cart:
                    return true;
            }

            return false;
        });

        CartAdapter productAdapter = new CartAdapter(Cart.this, R.layout.cart_row, Variables.cart);
        listView.setAdapter(productAdapter);

        tc.setText("Fizetendő: " + String.valueOf(Variables.getCartItemsCost()) + " Ft");

        placeOrder.setOnClickListener(view -> startActivity(new Intent(Cart.this, PlaceOrder.class)));
    }
}