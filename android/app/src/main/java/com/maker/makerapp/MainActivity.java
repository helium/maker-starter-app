package com.maker.makerapp;
import expo.modules.ReactActivityDelegateWrapper;
import com.facebook.react.ReactActivityDelegate;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import android.view.WindowManager;
import expo.modules.ReactActivityDelegateWrapper;

public class MainActivity extends ReactActivity {
    @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MakerApp";
  }

  @Override
  protected void onPause() {
    super.onPause();
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
  }

  @Override
  protected void onResume() {
    super.onResume();
    getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(
     this,
     new ReactActivityDelegate(this, getMainComponentName()) {
       @Override
       protected ReactRootView createRootView() {
         return new RNGestureHandlerEnabledRootView(MainActivity.this);
       }
     }
   );
  }
}
