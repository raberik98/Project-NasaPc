package com.example.webshopproject;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class Profile extends AppCompatActivity {

    BottomNavigationView bnv;
    Button logout;
    TextView email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        bnv = findViewById(R.id.bottom_navigation);
        bnv.setSelectedItemId(R.id.profile);
        logout = findViewById(R.id.btn_logout);
        email = findViewById(R.id.text_email);

        Bundle bundle = getIntent().getExtras();
        if (bundle != null) {
            email.setText("Email címed: " + bundle.getString("email"));
        } else {
            SharedPreferences data = getSharedPreferences("webshop", MODE_PRIVATE);
            if(!data.getString("email", "").equals("")) {
                email.setText("Email címed: " + data.getString("email", ""));
            } else {
                email.setText("");
            }

        }


        //Change the built in bottom nav color
        getWindow().setNavigationBarColor(getResources().getColor(R.color.primary));

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SharedPreferences data = getSharedPreferences("webshop", MODE_PRIVATE);
                SharedPreferences.Editor prefEditor = data.edit();
                prefEditor.putBoolean("isLoggedIn", false);
                prefEditor.commit();

                startActivity(new Intent(getApplicationContext(), Login.class));
                finish();
            }
        });

        bnv.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {

            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                SharedPreferences data = getSharedPreferences("webshop", MODE_PRIVATE);
                switch (item.getItemId()) {
                    case R.id.products:
                        startActivity(new Intent(getApplicationContext(), MainActivity.class));
                        finish();
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.profile:
                        return true;
                    case R.id.orders:
                        if(data.getBoolean("isLoggedIn", false)) {
                            startActivity(new Intent(getApplicationContext(), Orders.class));
                        } else {
                            startActivity(new Intent(getApplicationContext(), OrdersNotLoggedIn.class));
                        }
                        finish();
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.cart:
                        startActivity(new Intent(getApplicationContext(), Cart.class));
                        finish();
                        overridePendingTransition(0,0);
                        return true;
                }

                return false;
            }
        });

    }
}