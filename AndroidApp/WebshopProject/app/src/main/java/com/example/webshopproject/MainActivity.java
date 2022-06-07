package com.example.webshopproject;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.StrictMode;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    ListView listView;
    EditText editText;

    BottomNavigationView bnv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //IT HELPS LOAD THE IMAGE FROM URL
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        //Change the built in bottom nav color
        getWindow().setNavigationBarColor(getResources().getColor(R.color.primary));

        listView = findViewById(R.id.listView);
        editText = findViewById(R.id.editText);
        bnv = findViewById(R.id.bottom_navigation);

        bnv.setSelectedItemId(R.id.products);

        String url =  Variables.getBackendUrl() + "/api/products";
        Variables.products = new ArrayList<>();
        Variables.filteredProducts = new ArrayList<>();

        ArrayList<String> categories = new ArrayList<>();
        categories.add("All");

        Spinner spinner = (Spinner) findViewById(R.id.category_spinner);
        ArrayAdapter<String> adapter = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_dropdown_item, categories);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);


        bnv.setOnNavigationItemSelectedListener(item -> {
            SharedPreferences data = getSharedPreferences("webshop", MODE_PRIVATE);
            switch (item.getItemId()) {
                case R.id.products:
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
                    startActivity(new Intent(getApplicationContext(), Cart.class));
                    overridePendingTransition(0,0);
                    return true;
            }

            return false;
        });

        editText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                Variables.filteredProducts.clear();

                for(int index = 0; index<Variables.products.size(); index++) {
                    if((spinner.getSelectedItem().toString().equalsIgnoreCase(Variables.products.get(index).getCategory()) && Variables.products.get(index).getName().toLowerCase().contains(editText.getText().toString().toLowerCase())) || (spinner.getSelectedItem().toString().equalsIgnoreCase("All") && Variables.products.get(index).getName().toLowerCase().contains(editText.getText().toString().toLowerCase()))) {
                        Variables.filteredProducts.add(Variables.products.get(index));
                    }
                }

                ProductAdapter productAdapter = new ProductAdapter(MainActivity.this, R.layout.list_row, Variables.filteredProducts);
                listView.setAdapter(productAdapter);
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                Log.d("CATEGORY", categories.get(position));

                Variables.filteredProducts.clear();
                for (int i = 0; i<Variables.products.size(); i++) {
                    if(categories.get(position).equalsIgnoreCase("All") && Variables.products.get(i).getName().toLowerCase().contains(editText.getText().toString().toLowerCase())) {
                        Variables.filteredProducts.add(Variables.products.get(i));
                    } else if(Variables.products.get(i).getCategory().equalsIgnoreCase(categories.get(position)) && Variables.products.get(i).getName().toLowerCase().contains(editText.getText().toString().toLowerCase())) {
                        Variables.filteredProducts.add(Variables.products.get(i));
                    }
                }

                ProductAdapter productAdapter = new ProductAdapter(MainActivity.this, R.layout.list_row, Variables.filteredProducts);
                listView.setAdapter(productAdapter);
            }
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });

        listView.setOnItemClickListener((adapterView, view, i, l) -> {
            Log.d("PRODUCT", Variables.products.get(i).getName());

            Intent intent = new Intent(MainActivity.this, SelectedProduct.class);
            intent.putExtra("_id", Variables.products.get(i).get_id());
            intent.putExtra("name", Variables.products.get(i).getName());
            intent.putExtra("category", Variables.products.get(i).getCategory());
            intent.putExtra("description", Variables.products.get(i).getDescription());
            intent.putExtra("price", Variables.products.get(i).getPrice());
            intent.putExtra("path", Variables.products.get(i).getPath());

            startActivity(intent);
        });

        JsonArrayRequest jsonObjectRequest = new JsonArrayRequest
                (Request.Method.GET, url, null, response -> {
                    Variables.products.clear();
                    Variables.filteredProducts.clear();

                    try {
                        for(int i = 0; i<response.length(); i++) {
                            JSONObject jsonObj = response.getJSONObject(i);
                            if(!categories.contains(jsonObj.getString("category"))) {
                                categories.add(jsonObj.getString("category"));
                            }
                            Variables.products.add(new Product(jsonObj.getString("_id"), jsonObj.getString("name"), jsonObj.getString("category"), jsonObj.getString("description"), jsonObj.getInt("price"), jsonObj.getString("path")));
                        }

                        Variables.filteredProducts.addAll(Variables.products);

                        ProductAdapter productAdapter = new ProductAdapter(MainActivity.this, R.layout.list_row, Variables.products);
                        listView.setAdapter(productAdapter);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }, error -> {

                });

        RequestQueue requestQueue = Volley.newRequestQueue(MainActivity.this);
        requestQueue.add(jsonObjectRequest);
    }
}