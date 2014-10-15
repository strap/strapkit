package com.straphq.androidwearsampleprojectreal;

import android.webkit.JavascriptInterface;
import android.content.Context;
import android.webkit.WebView;
import android.util.Log;
import android.os.Handler;

import com.google.android.gms.wearable.*;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.wearable.DataApi;
import com.google.android.gms.wearable.DataEventBuffer;
import com.google.android.gms.common.api.PendingResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.Date;
import java.util.ArrayList;

import com.straphq.wear_sdk.StrapMetrics;

/**
 * Created by jonahback on 9/19/14.
 */
public class StrapKit implements DataApi.DataListener {
    Context mContext;
    GoogleApiClient mGoogleApiClient;
    WebView mWebView;
    private Handler handler = new Handler();
    private StrapMetrics metrics;

    boolean metricsEnabled = false;


    /** Instantiate the interface and set the context */
    StrapKit(Context c, GoogleApiClient mGoogleApiClient) {
        mContext = c;
        this.mGoogleApiClient = mGoogleApiClient;
        metrics = new StrapMetrics();

    }

  //JS Interface methods


    //StrapMetrics methods
    @JavascriptInterface
    public void strapMetricsInit(String appID) {
        metrics.initFromPhone(appID);
        metricsEnabled = true;
    }

    @JavascriptInterface
    public void strapMetricsLogEvent(String event, String cvar) {
        JSONObject cvarData = null;
        try {
            cvarData = new JSONObject(cvar);
        } catch (JSONException e) {

        }
        metrics.logEvent(event, cvarData);
    }

    @JavascriptInterface
    public void setListView(String title, String viewID, String listJSON) {
        JSONArray listItems = null;
        ArrayList<String> listStrings = new ArrayList<String>();
        try {
            listItems = new JSONArray(listJSON);
        } catch (JSONException e) {

        }

        if(listItems != null) {

            for(int i=0; i<listItems.length(); i++) {
                try{
                    JSONObject data = listItems.getJSONObject(i);
                    listStrings.add(data.getString("title"));
                 } catch (JSONException e) {

                }
            }

            PutDataMapRequest dataMap = PutDataMapRequest.create("/views/" + viewID);
            dataMap.getDataMap().putString("id", viewID);
            dataMap.getDataMap().putString("date", new Date().toString());
            dataMap.getDataMap().putStringArrayList("listItems", listStrings);
            dataMap.getDataMap().putInt("type", 2);

            PutDataRequest request = dataMap.asPutDataRequest();
            PendingResult<DataApi.DataItemResult> pendingResult = Wearable.DataApi
                    .putDataItem(mGoogleApiClient, request);
        }
    }

    @JavascriptInterface
    public void setTextView(String viewText, String viewID) {
        try {
             JSONObject viewJSON = new JSONObject();
            System.out.print(viewID);

            PutDataMapRequest dataMap = PutDataMapRequest.create("/views/" + viewID);
            dataMap.getDataMap().putString("id", viewID);
            dataMap.getDataMap().putString("title", viewText);
            dataMap.getDataMap().putString("date", new Date().toString());
            dataMap.getDataMap().putInt("type", 1);


            PutDataRequest request = dataMap.asPutDataRequest();
            PendingResult<DataApi.DataItemResult> pendingResult = Wearable.DataApi
                    .putDataItem(mGoogleApiClient, request);
        } catch (Exception e) {

        }


    }

    //Sensor methods

    //Android-specific methods
    @JavascriptInterface
    public void  confirmActivity(String message) {
        PutDataMapRequest dataMapRequest = PutDataMapRequest.create("/confirmActivity");
        dataMapRequest.getDataMap().putString("message", message);
        dataMapRequest.getDataMap().putString("date", new Date().toString());

        PutDataRequest request = dataMapRequest.asPutDataRequest();
        PendingResult<DataApi.DataItemResult> pendingResult = Wearable.DataApi
                .putDataItem(mGoogleApiClient, request);
    }

    public void log(String msg) {
        Log.d("Strapkit", msg);
    }

    public void init() {
        handler.post(new Runnable() {
            @Override
            public void run() {
                mWebView.loadUrl("javascript:strapkit.init()");
            }
        });
    }

    //Wear methods
    public void onTouch(final String viewID) {
        handler.post(new Runnable() {
            @Override
            public void run() {
                mWebView.loadUrl("javascript:strapkit.onTouch('" + viewID + "', 'blahdata')");
            }
        });
    }

    public void onSelect(final String viewID, final int position) {
        handler.post(new Runnable() {
            @Override
            public void run() {
                mWebView.loadUrl("javascript:strapkit.onSelect('" + viewID + "'," + position + ")");
            }
        });
    }

    @Override
    public void onDataChanged(DataEventBuffer buffer) {
        for(DataEvent evt : buffer) {

            if(metricsEnabled && metrics.canHandleMsg(evt)) {
                try {
                    metrics.processReceiveData(DataMapItem.fromDataItem(evt.getDataItem()).getDataMap());
                } catch (Exception e) {

                }
            }

            if(evt.getDataItem().getUri().getPathSegments().get(0).equals("strapkitInit")) {
                init();
            }

            if(evt.getDataItem().getUri().getPathSegments().get(0).equals("onTouch")) {
                DataItem item = evt.getDataItem();
                DataMap map = DataMapItem.fromDataItem(item).getDataMap();
                final String viewID = map.getString("id");
                onTouch(viewID);
            }

            if(evt.getDataItem().getUri().getPathSegments().get(0).equals("onSelect")) {
                DataItem item = evt.getDataItem();
                DataMap map = DataMapItem.fromDataItem(item).getDataMap();
                final String viewID = map.getString("id");
                final int position = map.getInt("position");
                onSelect(viewID, position);
            }


        }
        buffer.release();
    }
}