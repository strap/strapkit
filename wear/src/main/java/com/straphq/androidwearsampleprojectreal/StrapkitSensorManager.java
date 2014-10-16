package com.straphq.androidwearsampleprojectreal;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.wearable.DataApi;
import com.google.android.gms.wearable.PutDataMapRequest;
import com.google.android.gms.wearable.PutDataRequest;
import com.google.android.gms.wearable.Wearable;

import java.util.Date;

/**
 * Created by jonahback on 10/9/14.
 */
public class StrapkitSensorManager implements SensorEventListener {

    private SensorManager mSensorManager;
    private GoogleApiClient mGoogleApiClient;

    StrapkitSensorManager(SensorManager sensorManager, GoogleApiClient googleApiClient) {
        mSensorManager = sensorManager;
        mGoogleApiClient = googleApiClient;
    }

    public void attachListener(int sensorType) {
        Sensor sensor = mSensorManager.getDefaultSensor(sensorType);
        mSensorManager.registerListener(this, sensor, SensorManager.SENSOR_DELAY_NORMAL);

    }

    public void detachListener(int sensorType) {
        Sensor sensor = mSensorManager.getDefaultSensor(sensorType);
        mSensorManager.unregisterListener(this, sensor);
    }

    //interface methods

    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }

    public void onSensorChanged(SensorEvent evt) {
        PutDataMapRequest dataMap = PutDataMapRequest.create("/sensor/" + evt.sensor.getType() + "/onSensorChanged");
        dataMap.getDataMap().putFloatArray("values", evt.values);
    }


}
