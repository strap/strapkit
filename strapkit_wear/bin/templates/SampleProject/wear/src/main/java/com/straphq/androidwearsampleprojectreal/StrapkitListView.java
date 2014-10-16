package com.straphq.androidwearsampleprojectreal;

import android.support.wearable.view.WearableListView;
import android.view.ViewGroup;

import com.google.android.gms.wearable.*;

import java.util.ArrayList;

/**
 * Created by jonahback on 10/1/14.
 */
public class StrapkitListView extends StrapkitView{

    private ArrayList<String> listItems;

    public StrapkitListView() {

    }

    public StrapkitListView(DataMap map) {
        super(map);
        listItems = map.getStringArrayList("listItems");
    }

    public ArrayList<String> getListItems() {
        return listItems;
    }

}
