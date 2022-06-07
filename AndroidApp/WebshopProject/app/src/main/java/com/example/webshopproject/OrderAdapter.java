package com.example.webshopproject;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;

import java.util.ArrayList;

public class OrderAdapter extends ArrayAdapter<Order> {
    private Context mContext;
    private int mResource;

    public OrderAdapter(@NonNull Context context, int resource, @NonNull ArrayList<Order> objects) {
        super(context, resource, objects);
        this.mContext = context;
        this.mResource = resource;
    }

    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater layoutInflater = LayoutInflater.from(mContext);

        if (convertView == null) {
            convertView = layoutInflater.inflate(R.layout.order_row, parent, false);
        }

        ConstraintLayout layout = convertView.findViewById(R.id.layout);

        ImageView imageView = convertView.findViewById(R.id.imageView);
        TextView txtName = convertView.findViewById(R.id.txtName);
        TextView txtItems = convertView.findViewById(R.id.txtItems);
        TextView txtTotalCost = convertView.findViewById(R.id.total_cost);

        imageView.setImageResource(R.drawable.package_icon);
        txtName.setText(getItem(position).getID());
        String prodStr = "";
        for(int i = 0; i< Variables.orders.get(position).getProducts().size(); i++) {
            if(i != Variables.orders.get(position).getProducts().size()-1) {
                prodStr += Variables.orders.get(position).getProducts().get(i) + "\n\n";
            } else {
                prodStr += Variables.orders.get(position).getProducts().get(i);
            }
        }
        txtItems.setText(prodStr);
        txtTotalCost.setText("Összesen: " + String.valueOf(getItem(position).getCost()) + " Ft");

        return convertView;
    }

    @Override
    public boolean isEnabled(int position) {
        return false;
    }

}
