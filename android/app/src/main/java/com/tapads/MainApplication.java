package com.tapads;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import io.invertase.firebase.RNFirebasePackage;

import com.ocetnik.timer.BackgroundTimerPackage;
import com.rnfs.RNFSPackage;
import org.reactnative.camera.RNCameraPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.pilloxa.backgroundjob.BackgroundJobPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.imagepicker.ImagePickerPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.realm.react.RealmReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

// custom edit
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new RNDeviceInfo(),
            new RNFirebasePackage(),
            new BackgroundTimerPackage(),
            new RNFSPackage(),
            new RNCameraPackage(),
            new ReactNativePushNotificationPackage(),
            new BackgroundJobPackage(),
            new RNCWebViewPackage(),
            new RNSoundPackage(),
            new RNGeocoderPackage(),
            new ImagePickerPackage(),
            new RNFusedLocationPackage(),
            new MapsPackage(),
            new RNGestureHandlerPackage(),
            new RealmReactPackage(),
            
            // custom edit
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
