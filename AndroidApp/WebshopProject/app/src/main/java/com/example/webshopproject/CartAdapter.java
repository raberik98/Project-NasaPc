package com.example.webshopproject;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;

import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;

public class CartAdapter extends ArrayAdapter<CartItem> {
    private Context mContext;
    private int mResource;

    public CartAdapter(@NonNull Context context, int resource, @NonNull ArrayList<CartItem> objects) {
        super(context, resource, objects);
        this.mContext = context;
        this.mResource = resource;
    }

    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater layoutInflater = LayoutInflater.from(mContext);

        if (convertView == null) {
            convertView = layoutInflater.inflate(R.layout.cart_row, parent, false);
        }

        ConstraintLayout layout = convertView.findViewById(R.id.layout);

        ImageView imageView = convertView.findViewById(R.id.imageView);
        TextView txtName = convertView.findViewById(R.id.txtName);
        TextView txtPrice = convertView.findViewById(R.id.txtPrice);

        Button subtract = convertView.findViewById(R.id.subtract);
        TextView quantity = convertView.findViewById(R.id.quantity);
        Button add = convertView.findViewById(R.id.add);

        subtract.setOnClickListener(view -> {
            int quint = Integer.valueOf(quantity.getText().toString())-1;
            if(quint != 0) {
                quantity.setText(String.valueOf(quint));
                Variables.cart.get(position).setQuantity(quint);
            } else {
                Variables.cart.remove(getItem(position));

                if(Variables.cart.size() == 0) {
                    Cart.placeOrder.setVisibility(View.INVISIBLE);
                    Cart.tc.setVisibility(View.INVISIBLE);

                    Cart.cartImage.setVisibility(View.VISIBLE);
                    Cart.cartText.setVisibility(View.VISIBLE);
                } else {
                    Cart.placeOrder.setVisibility(View.VISIBLE);
                    Cart.tc.setVisibility(View.VISIBLE);

                    Cart.cartImage.setVisibility(View.INVISIBLE);
                    Cart.cartText.setVisibility(View.INVISIBLE);
                }
            }
            CartAdapter productAdapter = new CartAdapter(mContext, R.layout.cart_row, Variables.cart);
            Cart.listView.setAdapter(productAdapter);

            Cart.tc.setText("Fizetendő: " + String.valueOf(Variables.getCartItemsCost()) + " Ft");
        });

        add.setOnClickListener(view -> {
            int quint = Integer.valueOf(quantity.getText().toString())+1;
            quantity.setText(String.valueOf(Integer.valueOf(quantity.getText().toString())+1));
            Variables.cart.get(position).setQuantity(quint);

            CartAdapter productAdapter = new CartAdapter(mContext, R.layout.cart_row, Variables.cart);
            Cart.listView.setAdapter(productAdapter);

            Cart.tc.setText("Fizetendő: " + String.valueOf(Variables.getCartItemsCost()) + " Ft");
        });

        imageView.setImageDrawable(LoadImageFromWebOperations( Variables.getFrontendUrl() + "/image/" + getItem(position).getPath()));

        txtName.setText(getItem(position).getName());
        txtPrice.setText(String.valueOf(getItem(position).getPrice()) + " Ft");
        quantity.setText(String.valueOf(getItem(position).getQuantity()));

        return convertView;
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
