package com.straphq.androidwearsampleprojectreal;

import android.support.wearable.view.WearableListView;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.TextView;
import android.content.Context;

import java.util.ArrayList;

/**
 * Created by jonahback on 10/1/14.
 */
public class StrapkitListAdapter extends WearableListView.Adapter {
    private ArrayList<String> items;
    private LayoutInflater mInflater;

    public StrapkitListAdapter() {

    }
    public void setItems(ArrayList<String> items) {
        this.items = items;
    }

    public StrapkitListAdapter(Context context, StrapkitListView listView) {
        items = listView.getListItems();
        mInflater = LayoutInflater.from(context);
    }



    @Override
    public int getItemCount() {
        return items.size();
    }

    @Override
    public WearableListView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new WearableListView.ViewHolder(
                mInflater.inflate(android.R.layout.simple_list_item_1, null));
    }

    @Override
    public void onBindViewHolder(WearableListView.ViewHolder holder, int position) {
        TextView view = (TextView) holder.itemView.findViewById(android.R.id.text1);
        view.setText(items.get(position));
        //view.setText("dum");
        holder.itemView.setTag(position);
    }
}
