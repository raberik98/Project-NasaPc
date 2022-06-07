package com.example.webshopproject;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.ListView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Orders extends AppCompatActivity {

    BottomNavigationView bnv;
    ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_orders);

        bnv = findViewById(R.id.bottom_navigation);
        bnv.setSelectedItemId(R.id.orders);
        listView = findViewById(R.id.listView);

        //Change the built in bottom nav color
        getWindow().setNavigationBarColor(getResources().getColor(R.color.primary));

        OrderAdapter orderAdapter = new OrderAdapter(Orders.this, R.layout.order_row, Variables.orders);
        listView.setAdapter(orderAdapter);

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
                        if(data.getBoolean("isLoggedIn", false)) {
                            startActivity(new Intent(getApplicationContext(), Profile.class));
                        } else {
                            startActivity(new Intent(getApplicationContext(), Login.class));
                        }
                        finish();
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.orders:
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
        getOrders();
    }

    private void getOrders() {
        SharedPreferences data = getSharedPreferences("webshop", MODE_PRIVATE);

        JsonArrayRequest jsonObjectRequest = new JsonArrayRequest
                (Request.Method.GET, Variables.getBackendUrl() + "/api/mobile/getUserOrders/" + data.getString("userId", "") + "/" + data.getString("session", ""), null, response -> {
                    try {
                        Variables.orders.clear();
                        for(int i = 0; i<response.length(); i++) {
                            JSONObject jsonObj = response.getJSONObject(i);

                            ArrayList<String> products = new ArrayList<>();

                            for(int j = 0; j<jsonObj.getJSONArray("items").length(); j++) {
                                JSONObject jsonProds = jsonObj.getJSONArray("items").getJSONObject(j).getJSONObject("product");
                                products.add(jsonProds.getString("quantity") + "x " + jsonProds.getString("name"));

                            }
                            Variables.orders.add(new Order(jsonObj.getString("id"), products, jsonObj.getInt("total_price")));

                        }

                        OrderAdapter orderAdapter = new OrderAdapter(Orders.this, R.layout.order_row, Variables.orders);
                        listView.setAdapter(orderAdapter);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                });

        RequestQueue requestQueue = Volley.newRequestQueue(Orders.this);
        requestQueue.add(jsonObjectRequest);
    }
}