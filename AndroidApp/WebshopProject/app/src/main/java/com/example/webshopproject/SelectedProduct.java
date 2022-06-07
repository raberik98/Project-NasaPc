package com.example.webshopproject;

import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.io.InputStream;
import java.net.URL;

public class SelectedProduct extends AppCompatActivity {

    ImageView imageView;
    TextView name;
    TextView description;
    TextView price;
    Button addToCart;

    Product p;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_selected_product);

        imageView = findViewById(R.id.imageView);
        name = findViewById(R.id.name);
        description = findViewById(R.id.description);
        price = findViewById(R.id.price);
        addToCart = findViewById(R.id.add_to_cart);

        //Change the built in bottom nav color
        getWindow().setNavigationBarColor(getResources().getColor(R.color.primary));

        description.setMovementMethod(new ScrollingMovementMethod());

        Bundle bundle = getIntent().getExtras();
        if (bundle != null) {
            imageView.setImageDrawable(LoadImageFromWebOperations(Variables.getFrontendUrl() + "/image/" + bundle.getString("path")));

            name.setText(bundle.getString("name"));
            description.setText(bundle.getString("description"));
            price.setText(String.valueOf(bundle.getInt("price")) + " Ft");

            p = new Product(bundle.getString("_id"), bundle.getString("name"), bundle.getString("category"), bundle.getString("description"), bundle.getInt("price"), bundle.getString("path"));
        }

        addToCart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Variables.addToCart(new CartItem(p._id, p.name, p.category, p.description, p.price, p.path));
                Toast.makeText(SelectedProduct.this, "A termék hozzá lett adva a kosárhoz.", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public static Drawable LoadImageFromWebOperations(String url) {
        try {
            InputStream is = (InputStream) new URL(url).getContent();
            return Drawable.createFromStream(is, "src name");
        } catch (Exception e) {
            return null;
        }
    }
}