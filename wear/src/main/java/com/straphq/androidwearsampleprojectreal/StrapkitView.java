package com.straphq.androidwearsampleprojectreal;
import com.google.android.gms.wearable.DataMap;

/**
 * Created by jonahback on 9/29/14.
 */
public class StrapkitView {


    private String id;
    private String title;
    private StrapkitView child;
    private int type;

    public StrapkitView() {

    }

    public StrapkitView(DataMap map) {
        this.id = map.getString("id");
        this.title = map.getString("title");
        if(map.containsKey("child")) {
            this.child  = new StrapkitView(map.getDataMap("child"));
        }
        if(map.containsKey("type")) {
            this.type = map.getInt("type");
        }
    }

    public StrapkitView(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setChild(StrapkitView child) {
        this.child = child;
    }
    public void setType(int type) {
        this.type = type;
    }

    public int getType() {
        return this.type;
    }

    public String getTitle() {
        return title;
    }

    public String getId() {
        return id;
    }



}
