package com.straphq.test;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

class PostLog implements Runnable {
    private String url;
    private String query;

    public PostLog(String url, String query){
        this.url = url;
        this.query = query;
    }
    @Override
    public void run(){
        URL connURL = null;
        try {
            connURL = new URL(this.url);
        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        HttpsURLConnection conn = null;
        try {
            conn = (HttpsURLConnection) connURL.openConnection();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        conn.setReadTimeout(10000);
        conn.setConnectTimeout(60000);
        try {
            conn.setRequestMethod("POST");
        } catch (ProtocolException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setRequestProperty("Content-length", this.query.length() + "");
        conn.setRequestProperty("Connection", "close");
//	        conn.setDoInput(true);
        conn.setDoOutput(true);


//	        List<NameValuePair> params = new ArrayList<NameValuePair>();
//	        params.add(new BasicNameValuePair("firstParam", paramValue1));
//	        params.add(new BasicNameValuePair("secondParam", paramValue2));
//	        params.add(new BasicNameValuePair("thirdParam", paramValue3));
        //
        DataOutputStream wr = null;
        try {
            wr = new DataOutputStream(conn.getOutputStream());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
//	        BufferedWriter writer = new BufferedWriter(
//	                new OutputStreamWriter(os, "UTF-8"));
        try {
            wr.writeBytes(this.query);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        try {
            wr.flush();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        try {
            wr.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        int responseCode = 0;
        try {
            responseCode = conn.getResponseCode();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Post parameters : " + this.query);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = null;
        try {
            in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String inputLine;
        StringBuffer response = new StringBuffer();

        try {
            while (in != null && (inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        try {
            if (in != null) {
                in.close();
            } else {
                System.err.println("Input stream is null! Strap POST probably didn't work.");
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        //print result
        System.out.println(response.toString());
        try {
            conn.connect();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
