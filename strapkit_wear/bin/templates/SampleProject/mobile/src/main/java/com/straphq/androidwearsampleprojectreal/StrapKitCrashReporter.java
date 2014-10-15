package com.straphq.androidwearsampleprojectreal;

import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;

/**
 * Created by jonahback on 10/8/14.
 */
public class StrapKitCrashReporter extends WebChromeClient{

    @Override
    public boolean onConsoleMessage(ConsoleMessage message) {
        message.message();

        return true;
    }

}
