package com.example.webshopproject;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;

public class ProductAdapter extends ArrayAdapter<Product> {
    private Context mContext;
    private int mResource;

    public ProductAdapter(@NonNull Context context, int resource, @NonNull ArrayList<Product> objects) {
        super(context, resource, objects);
        this.mContext = context;
        this.mResource = resource;
    }

    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater layoutInflater = LayoutInflater.from(mContext);

        if (convertView == null) {
            convertView = layoutInflater.inflate(R.layout.list_row, parent, false);
        }

        ImageView imageView = convertView.findViewById(R.id.imageView);
        TextView txtName = convertView.findViewById(R.id.txtName);
        TextView txtPrice = convertView.findViewById(R.id.txtPrice);

        imageView.setImageDrawable(LoadImageFromWebOperations( Variables.getFrontendUrl() + "/image/" + getItem(position).getPath()));


        txtName.setText(getItem(position).getName());
        txtPrice.setText(String.valueOf(getItem(position).getPrice()) + " Ft");

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
