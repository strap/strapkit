package com.straphq.androidwearsampleprojectreal;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;


import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.GoogleApiClient.ConnectionCallbacks;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient.OnConnectionFailedListener;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.wearable.*;
import com.google.android.gms.wearable.DataApi;
import com.google.android.gms.common.api.Status;
import android.util.Log;
import android.webkit.WebView;

import com.straphq.wear_sdk.StrapMetrics;

public class MyActivity extends Activity {

    public GoogleApiClient mGoogleApiClient = null;
    private StrapKit strapKit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my);


        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addConnectionCallbacks(new ConnectionCallbacks() {
                    @Override
                    public void onConnected(Bundle connectionHint) {
                        Log.d("TAG", "onConnected: " + connectionHint);

                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                strapKit = new StrapKit(getApplicationContext(), mGoogleApiClient);
                                Wearable.DataApi.addListener(mGoogleApiClient, strapKit);


                                WebView jsEnv = new WebView(getApplicationContext());

                                jsEnv.getSettings().setJavaScriptEnabled(true);
                                jsEnv.getSettings().setAllowUniversalAccessFromFileURLs(true);
                                jsEnv.addJavascriptInterface(strapKit, "strapkit_bridge");
                                jsEnv.setWebChromeClient(new StrapKitCrashReporter());
                                strapKit.mWebView = jsEnv;
                                StrapKit_Test tester = new StrapKit_Test(strapKit);

                                //strapKit.init();
                                //tester.listView();
                            }
                        });

                    }

                    @Override
                    public void onConnectionSuspended(int cause) {
                        Log.d("", "onConnectionSuspended: " + cause);
                    }
                })
                .addOnConnectionFailedListener(new OnConnectionFailedListener() {
                    @Override
                    public void onConnectionFailed(ConnectionResult result) {
                        Log.d("", "onConnectionFailed: " + result);
                    }
                })
                .addApi(Wearable.API)
                .build();

        mGoogleApiClient.connect();
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.my, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return true;
    }
}