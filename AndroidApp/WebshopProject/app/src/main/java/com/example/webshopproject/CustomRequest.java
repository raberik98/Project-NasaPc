package com.example.webshopproject;

import android.util.Log;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.toolbox.HttpHeaderParser;

import org.json.JSONArray;

import java.nio.charset.StandardCharsets;
import java.util.Map;

public class CustomRequest<T> extends Request<T> {
    private final Map<String, String> headers;
    private final Response.Listener<T> listener;

    public CustomRequest(String url, Map<String, String> headers,
                         Response.Listener<JSONArray> listener, Response.ErrorListener errorListener) {
        super(Method.GET, url, errorListener);
        this.headers = headers;
        this.listener = (Response.Listener<T>) listener;
    }

    @Override
    public Map<String, String> getHeaders() throws AuthFailureError {
        return headers != null ? headers : super.getHeaders();
    }

    @Override
    protected void deliverResponse(T response) {
        Log.d("DELIVER_RESPONSE", response.toString());

        listener.onResponse((T) response);
    }

    @Override
    protected Response<T> parseNetworkResponse(NetworkResponse response) {
        try {
            String utf8String = new String(response.data, StandardCharsets.UTF_8);
            return (Response<T>) Response.success(new JSONArray(utf8String), HttpHeaderParser.parseCacheHeaders(response));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}