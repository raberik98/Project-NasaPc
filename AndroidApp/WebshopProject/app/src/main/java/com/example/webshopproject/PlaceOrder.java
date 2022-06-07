package com.example.webshopproject;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class PlaceOrder extends AppCompatActivity {

    Button placeOrder;
    EditText realName;
    EditText email;
    EditText phoneNumber;
    EditText shippingAddress;
    CheckBox checkBox;
    TextView errorMessage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_place_order);

        placeOrder = findViewById(R.id.btn_place_order);

        realName = findViewById(R.id.input_username);
        email = findViewById(R.id.input_email);
        phoneNumber = findViewById(R.id.input_phone_number);
        shippingAddress = findViewById(R.id.input_address);
        checkBox = findViewById(R.id.checkBox);
        errorMessage = findViewById(R.id.error_message);


        fillSpinner();

        //Change the built in bottom nav color
        getWindow().setNavigationBarColor(getResources().getColor(R.color.primary));

        placeOrder.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(realName.getText().toString().split(" ").length <= 1) {
                    errorMessage.setText("Hiba: Kérem valós nevet adjon meg!");
                    errorMessage.setVisibility(View.VISIBLE);
                } else if (email.getText().toString().equals("") || phoneNumber.getText().equals("") || shippingAddress.getText().equals("")) {
                    errorMessage.setText("Hiba: Kérem töltse ki az összes mezőt!");
                    errorMessage.setVisibility(View.VISIBLE);
                } else if (!checkBox.isChecked()) {
                    errorMessage.setText("Hiba: Kérem fogadja el a szabályzatot!");
                    errorMessage.setVisibility(View.VISIBLE);
                } else {
                    postOrder(realName.getText().toString().split(" ")[1], realName.getText().toString().split(" ")[0], email.getText().toString(), phoneNumber.getText().toString(), shippingAddress.getText().toString());
                    startActivity(new Intent(PlaceOrder.this, OrderSuccess.class));
                }


            }
        });
    }

    private void fillSpinner() {
        ArrayList<String> payment_methods = new ArrayList<>();
        payment_methods.add("Előre utalás");
        payment_methods.add("Utánvét");

        Spinner spinner = (Spinner) findViewById(R.id.spinner);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getApplicationContext(),  android.R.layout.simple_spinner_dropdown_item, payment_methods);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
    }

    private void postOrder(String firstName, String lastName, String email, String phoneNumber, String shippingAddress) {
        SharedPreferences data = getSharedPreferences("webshop", MODE_PRIVATE);

        JSONObject jsonBody = new JSONObject();
        try {
            jsonBody.put("last_name", firstName);
            jsonBody.put("first_name", lastName);
            jsonBody.put("shipping_address", shippingAddress);
            jsonBody.put("billing_address", shippingAddress);
            jsonBody.put("email", email);
            jsonBody.put("phone_number", phoneNumber);
            jsonBody.put("total_price", Variables.getCartItemsCost());

            JSONArray arr = new JSONArray();
            for(int i = 0; i<Variables.cart.size(); i++) {
                JSONObject product2 = new JSONObject();
                JSONObject product = new JSONObject();
                CartItem item = Variables.cart.get(i);
                product.put("_id", item.get_id());
                product.put("name", item.getName());
                product.put("category", item.getCategory());
                product.put("description", item.getDescription());
                product.put("price", item.getPrice());
                product.put("path", item.getPath());
                product.put("quantity", item.getQuantity());

                product2.put("product", product);
                arr.put(product2);
            }


            jsonBody.put("items", arr);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        //final String requestBody = jsonBody.toString();

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                (Request.Method.POST, Variables.getBackendUrl() + "/api/mobile/place-order/" + data.getString("session", "")  , jsonBody, response -> {

                }, error -> {

                });



        RequestQueue requestQueue = Volley.newRequestQueue(PlaceOrder.this);
        requestQueue.add(jsonObjectRequest);
    }
}