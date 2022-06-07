package com.example.webshopproject;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class OrdersNotLoggedIn extends AppCompatActivity {

    BottomNavigationView bnv;
    Button login;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_orders_not_logged_in);

        bnv = findViewById(R.id.bottom_navigation);
        bnv.setSelectedItemId(R.id.orders);
        login = findViewById(R.id.btn_login);

        //Change the built in bottom nav color
        getWindow().setNavigationBarColor(getResources().getColor(R.color.primary));

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SharedPreferences data = getSharedPreferences("webshop", MODE_PRIVATE);
                if(data.getBoolean("isLoggedIn", false)) {
                    startActivity(new Intent(getApplicationContext(), Profile.class));
                } else {
                    startActivity(new Intent(getApplicationContext(), Login.class));
                }
                overridePendingTransition(0,0);
            }
        });

        bnv.setOnNavigationItemSelectedListener(item -> {
            switch (item.getItemId()) {
                case R.id.products:
                    startActivity(new Intent(getApplicationContext(), MainActivity.class));
                    overridePendingTransition(0,0);
                    return true;
                case R.id.profile:
                    SharedPreferences data = getSharedPreferences("webshop", MODE_PRIVATE);
                    if(data.getBoolean("isLoggedIn", false)) {
                        startActivity(new Intent(getApplicationContext(), Profile.class));
                    } else {
                        startActivity(new Intent(getApplicationContext(), Login.class));
                    }
                    overridePendingTransition(0,0);
                    return true;
                case R.id.orders:
                    return true;
                case R.id.cart:
                    startActivity(new Intent(getApplicationContext(), Cart.class));
                    overridePendingTransition(0,0);
                    return true;
            }

            return false;
        });
    }
}