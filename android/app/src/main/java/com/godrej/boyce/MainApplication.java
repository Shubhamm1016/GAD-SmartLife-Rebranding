package com.godrej.boyce;


// import org.devio.rn.splashscreen.SplashScreen;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import android.app.Activity; // Add this import
import android.app.Application;
import android.content.Context;
import android.os.Bundle;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
//  import com.swmansion.rnscreens.RNScreensPackage;
//  import com.facebook.react.bridge.JSIModulePackage;
//  import com.swmansion.reanimated.ReanimatedJSIModulePackage;
//  import com.facebook.react.shell.MainReactPackage;
import com.godrej.boyce.newarchitecture.MainApplicationReactNativeHost;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
// import java.util.Arrays;


// import com.reactlibrary.rnwifi.RNWifiPackage;
public class MainApplication extends Application implements ReactApplication {
 
    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
 
                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }
 
                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
//                      packages.add(new RNScreensPackage());
//                     // packages.add(new SplashScreenReactPackage());
//                     // packages.add( new ESPProvisionBridgePackage());
// //   packages.add(new RNWifiPackage());
                    return packages;
//   return Arrays.<ReactPackage>asList(
//                 new MainReactPackage(),
//                 new RNScreensPackage() // Add the package here
//             );
                }
// @Override
// protected List<ReactPackage> getPackages() {
//     return Arrays.<ReactPackage>asList(
//         new MainReactPackage(),
        
//         new RNScreensPackage() // Add your custom package here
//     );
// }
// @Override
//     protected JSIModulePackage getJSIModulePackage() {
//       return new ReanimatedJSIModulePackage(); // <- add
//     }

 
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }
            };
 
    private final ReactNativeHost mNewArchitectureNativeHost =
            new MainApplicationReactNativeHost(this);
 
    @Override
    public ReactNativeHost getReactNativeHost() {
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            return mNewArchitectureNativeHost;
        } else {
            return mReactNativeHost;
        }
    }
 
    @Override
public void onCreate() {
    super.onCreate();
 
    // Register a callback to be invoked whenever a new activity is created
    // registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
        // @Override
        // public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
        //     // Show SplashScreen using the correct context
        //     SplashScreen.show(activity);
 
        //     // Unregister the callback after the SplashScreen is shown
        //     unregisterActivityLifecycleCallbacks(this);
        // }
 
        // Other lifecycle callback methods (onActivityStarted, onActivityResumed, etc.) can be implemented if needed
    // });
 
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
}
 
 
    private static void initializeFlipper(
            Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
                Class<?> aClass = Class.forName("com.godrej.boyce.ReactNativeFlipper");
                aClass
                        .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                        .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }
}
 