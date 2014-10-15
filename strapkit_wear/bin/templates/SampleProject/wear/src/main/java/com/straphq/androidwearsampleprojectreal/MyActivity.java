package com.straphq.androidwearsampleprojectreal;

import android.app.Activity;
import android.hardware.SensorManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.wearable.view.WatchViewStub;
import android.support.wearable.view.WearableListView;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import android.content.Intent;
import android.support.wearable.activity.ConfirmationActivity;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.wearable.*;
import com.google.android.gms.wearable.DataApi;
import com.google.android.gms.common.api.*;
import com.google.android.gms.common.api.GoogleApiClient.ConnectionCallbacks;
import android.util.Log;
import com.google.android.gms.common.api.GoogleApiClient.OnConnectionFailedListener;
import com.straphq.wear_sdk.Strap;

import org.json.JSONException;

import java.io.IOException;
import java.util.Date;


public class MyActivity extends Activity implements View.OnTouchListener, StrapkitActivity {

//  String strapAppID = this.getString(R.string.strap_app_id);
    String strapAppID = "";
    private static Strap strap = null;
    private GoogleApiClient mGoogleApiClient;
    private StrapkitBridge bridge;
    private StrapkitActivity listener;
    private View.OnTouchListener onTouchListener;

    private TextView mTextView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my);
        listener = this;
        onTouchListener = this;



        final WatchViewStub stub = (WatchViewStub) findViewById(R.id.watch_view_stub);
        stub.setOnLayoutInflatedListener(new WatchViewStub.OnLayoutInflatedListener() {
            @Override
            public void onLayoutInflated(WatchViewStub stub) {
                mTextView = (TextView) stub.findViewById(R.id.text);

            }

        });

        mGoogleApiClient = new GoogleApiClient.Builder(getApplicationContext())
                .addConnectionCallbacks(new ConnectionCallbacks() {
                    @Override
                    public void onConnected(Bundle connectionHint) {
                        Log.d("TAG", "onConnected: " + connectionHint);
                        //strap.logEvent("/app/started");

                    }
                    @Override
                    public void onConnectionSuspended(int cause) {
                        Log.d("TAG", "onConnectionSuspended: " + cause);
                    }
                })
                .addOnConnectionFailedListener(new OnConnectionFailedListener() {
                    @Override
                    public void onConnectionFailed(ConnectionResult result) {
                        Log.d("TAG", "onConnectionFailed: " + result);
                    }
                })
                .addApi(Wearable.API)
                .build();

        bridge = new StrapkitBridge(mGoogleApiClient, listener, getApplicationContext());

        strap = new Strap(mGoogleApiClient, getApplicationContext(), "");
        strap.setShouldLogAccel(false);

    }

    public void updateView(final StrapkitView v) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                boolean isNewView = true;
                ViewGroup viewGroup = (ViewGroup)getWindow().getDecorView();
                LinearLayout layout = new LinearLayout(getApplicationContext());
                if(v.getType() == 1) {
                    TextView textView = null;
                    if(viewGroup.findViewWithTag(v.getId()) != null) {
                        textView = (TextView)  viewGroup.findViewWithTag(v.getId());
                        textView.setText(v.getTitle());
                        isNewView = false;
                    } else {

                        textView = new TextView(getApplicationContext());
                        textView.setText(v.getTitle());
                        textView.setTag(v.getId());
                        textView.setOnTouchListener(onTouchListener);


                        textView.setLayoutParams(new LinearLayout.LayoutParams(
                                LinearLayout.LayoutParams.FILL_PARENT,
                                LinearLayout.LayoutParams.FILL_PARENT));
                        layout.addView(textView);
                    }
                }

                if(v.getType() == 2) {

                    StrapkitListView list = (StrapkitListView) v;



                    WearableListView listvw = (WearableListView)viewGroup.findViewWithTag(list.getId());
                    if(listvw != null) {
                        StrapkitListAdapter adapter = (StrapkitListAdapter) listvw.getAdapter();
                        adapter.setItems(list.getListItems());
                        adapter.notifyDataSetChanged();
                        isNewView = false;
                    } else {


                        WearableListView listView = new WearableListView(getApplicationContext());
                        //listView.set
                        listView.setGreedyTouchMode(true);
                        listView.setAdapter(new StrapkitListAdapter(getApplicationContext(), list));
                        listView.setTag(v.getId());
                        listView.setLayoutParams(new LinearLayout.LayoutParams(
                                LinearLayout.LayoutParams.FILL_PARENT,
                                LinearLayout.LayoutParams.FILL_PARENT));
                        listView.setClickListener(new StrapkitListListener(v.getId(), bridge));
                        layout.addView(listView);
                    }

                }
                if(isNewView)
                    setContentView(layout);
            }
        });
    }

    public boolean onTouch(View v, MotionEvent e) {
        String viewID = (String)v.getTag();
        bridge.onTouch(viewID);
        return true;
    }

    //Shows success message
    public void confirmActivity(String message) {
        Intent intent = new Intent(MyActivity.this, ConfirmationActivity.class);


        intent.putExtra(ConfirmationActivity.EXTRA_ANIMATION_TYPE, ConfirmationActivity.SUCCESS_ANIMATION);
        intent.putExtra(ConfirmationActivity.EXTRA_MESSAGE, message);

        startActivity(intent);
    }

}
