package com.straphq.androidwearsampleprojectreal;
/**
 * Created by jonahback on 9/30/14.
 */
public class StrapKit_Test {
    private StrapKit strapKit;

    StrapKit_Test(StrapKit strapKit) {
       this.strapKit = strapKit;
    }

    public void basicView() {
        strapKit.setTextView("Strapkit_Test", "someID");

    }

    public void listView() {
        strapKit.setListView("This is a list", "dumID", "[{text:'one'},{text:'two'}]");
    }

}
