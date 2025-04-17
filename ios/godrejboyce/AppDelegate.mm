//#import <Firebase.h>
//#import "AppDelegate.h"
//#import <React/RCTLinkingManager.h>
//
//#import <React/RCTBridge.h>
//#import <React/RCTBundleURLProvider.h>
//#import <React/RCTRootView.h>
//
//#import <React/RCTAppSetupUtils.h>
//#import <UserNotifications/UserNotifications.h>
//#import "godrejboyce-Swift.h"
//
//#if RCT_NEW_ARCH_ENABLED
//#import <React/CoreModulesPlugins.h>
//#import <React/RCTCxxBridgeDelegate.h>
//#import <React/RCTFabricSurfaceHostingProxyRootView.h>
//#import <React/RCTSurfacePresenter.h>
//#import <React/RCTSurfacePresenterBridgeAdapter.h>
//#import <ReactCommon/RCTTurboModuleManager.h>
//
//#import <react/config/ReactNativeConfig.h>
//
//static NSString *const kRNConcurrentRoot = @"concurrentRoot";
//
//@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
//  RCTTurboModuleManager *_turboModuleManager;
//  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
//  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
//  facebook::react::ContextContainer::Shared _contextContainer;
//}
//@end
//#endif
//
//@implementation AppDelegate
//
//
//- (BOOL)application:(UIApplication *)application
//   openURL:(NSURL *)url
//   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
//{
//  return [RCTLinkingManager application:application openURL:url options:options];
//}
//
//- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
//restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
//{
//return [RCTLinkingManager application:application
//                  continueUserActivity:userActivity
//                    restorationHandler:restorationHandler];
//}
//
//- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
//{
//  // Add me --- \/
//
//   NSString *rootPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
//
//   NSLog(@"File and Directory Structure:");
//   [self printDirectoryStructureFromPath:rootPath withIndentation:@""];
//
//   [FIRApp configure];
//   [self registerForRemoteNotifications];
//   // Add me --- /\
//
//
//
//  RCTAppSetupPrepareApp(application);
//
//  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
//
//#if RCT_NEW_ARCH_ENABLED
//  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
//  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
//  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
//  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
//  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
//#endif
//
//  NSDictionary *initProps = [self prepareInitialProps];
//  UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"godrej.boyce", initProps);
//
//  if (@available(iOS 13.0, *)) {
//    rootView.backgroundColor = [UIColor systemBackgroundColor];
//  } else {
//    rootView.backgroundColor = [UIColor whiteColor];
//  }
//
//  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIViewController *rootViewController = [UIViewController new];
//  rootViewController.view = rootView;
//  self.window.rootViewController = rootViewController;
//  [self.window makeKeyAndVisible];
//  return YES;
//}
//- (void)registerForRemoteNotifications {
//   UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//   center.delegate = self; // Set the notification center delegate
//   // Request notification permissions
//   [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge)
//                         completionHandler:^(BOOL granted, NSError * _Nullable error) {
//     if (granted) {
//       dispatch_async(dispatch_get_main_queue(), ^{
//         [[UIApplication sharedApplication] registerForRemoteNotifications];
//       });
//     } else {
//       NSLog(@"Notification permission not granted: %@", error.localizedDescription);
//     }
//   }];
//}
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////
////  NSDictionary *userInfo = response.notification.request.content.userInfo;
////  NSLog(@"APNS Notification Clicked: %@", userInfo);
////
////  // ✅ Post notification event to React Native
////  [[NSNotificationCenter defaultCenter] postNotificationName:@"NotificationClicked"
////                                                      object:nil
////                                                    userInfo:userInfo];
////
////  completionHandler();
////}
////
//// - (void)applicationDidEnterBackground:(UIApplication *)application {
////
//// }
//
//
//// Method to print directory structure
//- (void)printDirectoryStructureFromPath:(NSString *)path withIndentation:(NSString *)indentation {
//     NSFileManager *fileManager = [NSFileManager defaultManager];
//     NSError *error = nil;
//
//     // Get the list of files and directories
//     NSArray *contents = [fileManager contentsOfDirectoryAtPath:path error:&error];
//
//     if (error) {
//         NSLog(@"Error reading directory at %@: %@", path, error.localizedDescription);
//         return;
//     }
//
//     for (NSString *item in contents) {
//         // Construct full path for the item
//         NSString *itemPath = [path stringByAppendingPathComponent:item];
//         BOOL isDirectory = NO;
//
//         // Check if the item is a directory
//         if ([fileManager fileExistsAtPath:itemPath isDirectory:&isDirectory]) {
//             // Print the current item
//             NSLog(@"%@%@", indentation, item);
//
//             // If it's a directory, recursively call this method
//             if (isDirectory) {
//                 NSString *newIndentation = [indentation stringByAppendingString:@"  "];
//                 [self printDirectoryStructureFromPath:itemPath withIndentation:newIndentation];
//             }
//         }
//     }
//}
//
//- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
//   const unsigned char *tokenBytes = (const unsigned char *)[deviceToken bytes];
//   NSMutableString *deviceTokenString = [NSMutableString string];
//
//   for (NSUInteger i = 0; i < deviceToken.length; i++) {
//     [deviceTokenString appendFormat:@"%02x", tokenBytes[i]];
//   }
//
//   // Call setToken to set the device token
//   [[NotificationModule shared] setDeviceToken:deviceTokenString];
//}
//
//
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////
////    // Get the notification content
////    UNNotificationContent *content = response.notification.request.content;
////    NSString *title = content.title;
////    NSString *body = content.body;
////    NSDate *timestamp = [NSDate date]; // You can use a timestamp from your payload if available
////
////    // Load existing notifications from UserDefaults
////    NSMutableArray *storedNotifications = [[[NSUserDefaults standardUserDefaults] arrayForKey:@"StoredNotifications"] mutableCopy];
////    if (!storedNotifications) {
////        storedNotifications = [NSMutableArray array];
////    }
////
////    // Create a dictionary entry for the notification
////    NSDictionary *notificationEntry = @{
////        @"title": title,
////        @"body": body,
////        @"timestamp": timestamp
////    };
////
////    // Add the new notification to the stored array
////    [storedNotifications addObject:notificationEntry];
////    [[NSUserDefaults standardUserDefaults] setObject:storedNotifications forKey:@"StoredNotifications"];
////    [[NSUserDefaults standardUserDefaults] synchronize];
////
////    NSLog(@"Saved notification: %@ - %@", title, body);
////
////    // Present the Notification Center screen
////    UIViewController *rootVC = [UIApplication sharedApplication].delegate.window.rootViewController;
////
////    // Instantiate your NotificationListViewController (make sure it is implemented)
////    NotificationListViewController *notificationCenterVC = [[NotificationListViewController alloc] init];
////
////    // If the root view controller is a navigation controller, push the new view controller.
////    if ([rootVC isKindOfClass:[UINavigationController class]]) {
////        [(UINavigationController *)rootVC pushViewController:notificationCenterVC animated:YES];
////    } else if (rootVC.navigationController) {
////        [rootVC.navigationController pushViewController:notificationCenterVC animated:YES];
////    } else {
////        // Otherwise, present it modally.
////        [rootVC presentViewController:notificationCenterVC animated:YES completion:nil];
////    }
////
////    completionHandler();
////}
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////    if ([response.actionIdentifier isEqualToString:@"REMIND_ME_LATER"]) {
////        NSLog(@"🔁 'Remind Me Later' selected, scheduling a new reminder.");
////        NSString *title = response.notification.request.content.title;
////        NSString *body = response.notification.request.content.body;
////        [self scheduleReminderWithTitle:title body:body afterSeconds:15 * 24 * 60 * 60]; // 15 days in seconds
////    }
////    completionHandler();
////}
//
//
////- (void)scheduleReminderWithTitle:(NSString *)title body:(NSString *)body afterSeconds:(NSTimeInterval)seconds {
////    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
////
////    UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];
////    content.title = title;
////    content.body = [NSString stringWithFormat:@"%@\n🔔 This is your reminder.", body];
////    content.sound = [UNNotificationSound defaultSound];
////    content.categoryIdentifier = @"ALERT_CATEGORY"; // Use the same category
////
////    NSDate *triggerDate = [NSDate dateWithTimeIntervalSinceNow:seconds];
////    NSDateComponents *triggerComponents = [[NSCalendar currentCalendar] components:(NSCalendarUnitYear|NSCalendarUnitMonth|NSCalendarUnitDay|NSCalendarUnitHour|NSCalendarUnitMinute|NSCalendarUnitSecond) fromDate:triggerDate];
////
////    UNCalendarNotificationTrigger *trigger = [UNCalendarNotificationTrigger triggerWithDateMatchingComponents:triggerComponents repeats:NO];
////
////    NSString *identifier = [NSString stringWithFormat:@"reminder_%@_%@", title, [[NSUUID UUID] UUIDString]];
////    UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:identifier content:content trigger:trigger];
////
////    [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
////        if (error) {
////            NSLog(@"❌ Failed to schedule reminder: %@", error.localizedDescription);
////        } else {
////            NSLog(@"✅ 'Remind Me Later' notification scheduled for 15 days later with identifier: %@", identifier);
////        }
////    }];
////}
//
//// // Notification response handling
//// - (void)userNotificationCenter:(UNUserNotificationCenter *)center
//// didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////   NSDictionary *userInfo = response.notification.request.content.userInfo;
////   completionHandler();
//// }
////
//// // Silent notification handling
//// - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//// fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
////   completionHandler(UIBackgroundFetchResultNewData);
//// }
//// /// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
//// ///
//// /// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
//// /// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
//// /// @return: `true` if the `concurrentRoot` feture is enabled. Otherwise, it returns `false`.
//// - (BOOL)concurrentRootEnabled
//// {
////  // Switch this bool to turn on and off the concurrent root
////  return true;
//// }
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////
////    // Save the notification payload to NSUserDefaults here…
////    // (Your saving code remains unchanged)
////
////    NSLog(@"Presenting NotificationListViewController");
////
////    UIViewController *rootVC = [UIApplication sharedApplication].delegate.window.rootViewController;
////    NotificationListViewController *notificationVC = [[NotificationListViewController alloc] init];
////
////    if ([rootVC isKindOfClass:[UINavigationController class]]) {
////        [(UINavigationController *)rootVC pushViewController:notificationVC animated:YES];
////    } else if (rootVC.navigationController) {
////        [rootVC.navigationController pushViewController:notificationVC animated:YES];
////    } else {
////        [rootVC presentViewController:notificationVC animated:YES completion:nil];
////    }
////
////    completionHandler();
////}
//
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////  NSDictionary *userInfo = response.notification.request.content.userInfo;
////  NSLog(@"Received foreground notification....: %@", userInfo);
////
////  // Handle the foreground notification here (e.g., show a custom alert, trigger navigation)
////  completionHandler();
////}*************
//
////
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////    didReceiveNotificationResponse:(UNNotificationResponse *)response
////    withCompletionHandler:(void (^)(void))completionHandler {
////
////  NSDictionary *userInfo = response.notification.request.content.userInfo;
////  NSLog(@"Received notification userInfo: %@", userInfo);
////
////  // Navigate to Notification Center Screen
////  dispatch_async(dispatch_get_main_queue(), ^{
////      // Ensure to notify React Native that a notification was clicked
////      if (userInfo) {
////          NSMutableDictionary *modifiedUserInfo = [userInfo mutableCopy];
////          if (![modifiedUserInfo objectForKey:@"screen"]) {
////              [modifiedUserInfo setObject:@"NotificationCenterScreen" forKey:@"screen"];
////          }
////          [[NSNotificationCenter defaultCenter] postNotificationName:@"NotificationClicked"
////                                                              object:nil
////                                                            userInfo:modifiedUserInfo];
////      }
////  });
////
////  completionHandler();
////}
//
//
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center
//    didReceiveNotificationResponse:(UNNotificationResponse *)response
//    withCompletionHandler:(void (^)(void))completionHandler {
//
//  NSDictionary *userInfo = response.notification.request.content.userInfo;
//  NSLog(@"User clicked notification: %@", userInfo);
//
//  dispatch_async(dispatch_get_main_queue(), ^{
//      if (userInfo) {
//          [[NSNotificationCenter defaultCenter] postNotificationName:@"NotificationClicked"
//                                                              object:nil
//                                                            userInfo:userInfo];
//      }
//  });
//
//
//  completionHandler();
//}
//
//// Background and Silent Notification Handling (when app is in the background or closed)
//// Merge the two methods into one.
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
//  // This method handles both background and silent notifications.
//  NSLog(@"Received background/silent notification: %@", userInfo);
//
//  // You can perform background tasks like data sync here, or decide whether to show an alert.
//  completionHandler(UIBackgroundFetchResultNewData);  // Indicate new data was fetched or handled.
//}
//
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////
////    NSDictionary *userInfo = response.notification.request.content.userInfo;
////    NSLog(@"🔔 Received Notification in iOS: %@......", userInfo); // ✅ Xcode Debug Console
////
////    // ✅ Add an alert to confirm this function is running
////    dispatch_async(dispatch_get_main_queue(), ^{
////        UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Notification Clicked"
////                                                                       message:@"Received in native code!"
////                                                                preferredStyle:UIAlertControllerStyleAlert];
////        UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
////        [alert addAction:okAction];
////        [[[[UIApplication sharedApplication] keyWindow] rootViewController] presentViewController:alert animated:YES completion:nil];
////    });
////
////    if (userInfo) {
////        NSMutableDictionary *modifiedUserInfo = [userInfo mutableCopy];
////        if (![modifiedUserInfo objectForKey:@"screen"]) {
////            [modifiedUserInfo setObject:@"NotificationCenterScreen" forKey:@"screen"];
////        }
////
////        [[NSNotificationCenter defaultCenter] postNotificationName:@"NotificationClicked"
////                                                            object:nil
////                                                          userInfo:modifiedUserInfo];
////
////        NSLog(@"📩 Event posted to React Native");
////    }
////
////    completionHandler();
////}
////
////
//
//
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////
////  NSDictionary *userInfo = response.notification.request.content.userInfo;
////  NSLog(@"APNS Notification Clicked: %@", userInfo);
////
////  if (userInfo) {
////    // ✅ Ensure the notification contains a screen key for navigation
////    NSMutableDictionary *modifiedUserInfo = [userInfo mutableCopy];
////
////    if (![modifiedUserInfo objectForKey:@"screen"]) {
////      [modifiedUserInfo setObject:@"NotificationCenterScreen" forKey:@"screen"];  // Default navigation screen
////    }
////
////    // ✅ Send notification event to React Native
////    [[NSNotificationCenter defaultCenter] postNotificationName:@"NotificationClicked"
////                                                        object:nil
////                                                      userInfo:modifiedUserInfo];
////  }
////
////  // ✅ Ensure the completion handler is called
////  completionHandler();
////}
//
//// Method to control whether the concurrentRoot feature is turned on or off
//- (BOOL)concurrentRootEnabled {
//  // Switch this bool to turn on and off the concurrent root
//  return true;
//}
//
////
////// Required for deep linking
////- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
////    return [RCTLinkingManager application:application openURL:url options:options];
////}
//
//
//- (NSDictionary *)prepareInitialProps
//{
//  NSMutableDictionary *initProps = [NSMutableDictionary new];
//
//#ifdef RCT_NEW_ARCH_ENABLED
//  initProps[kRNConcurrentRoot] = @([self concurrentRootEnabled]);
//#endif
//
//  return initProps;
//}
//
//- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
//{
//#if DEBUG
//  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
//#else
//  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//#endif
//}
//
//#if RCT_NEW_ARCH_ENABLED
//
//#pragma mark - RCTCxxBridgeDelegate
//
//- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
//{
//  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
//                                                             delegate:self
//                                                            jsInvoker:bridge.jsCallInvoker];
//  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
//}
//
//#pragma mark RCTTurboModuleManagerDelegate
//
//- (Class)getModuleClassFromName:(const char *)name
//{
//  return RCTCoreModulesClassProvider(name);
//}
//
//- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
//                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
//{
//  return nullptr;
//}
//
//- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
//                                                     initParams:
//                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
//{
//  return nullptr;
//}
//
//- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
//{
//  return RCTAppSetupDefaultModuleFromClass(moduleClass);
//}
//
//#endif
//
//@end
 
 
//#import <Firebase.h>
//#import "AppDelegate.h"
//#import <React/RCTLinkingManager.h>
//#import <RNCPushNotificationIOS.h>
//#import <React/RCTBridge.h>
//#import <React/RCTBundleURLProvider.h>
//#import <React/RCTRootView.h>
//
//#import <React/RCTAppSetupUtils.h>
//#import <UserNotifications/UserNotifications.h>
//#import "godrejboyce-Swift.h"
//
//#if RCT_NEW_ARCH_ENABLED
//#import <React/CoreModulesPlugins.h>
//#import <React/RCTCxxBridgeDelegate.h>
//#import <React/RCTFabricSurfaceHostingProxyRootView.h>
//#import <React/RCTSurfacePresenter.h>
//#import <React/RCTSurfacePresenterBridgeAdapter.h>
//#import <ReactCommon/RCTTurboModuleManager.h>
//
//#import <react/config/ReactNativeConfig.h>
//
//static NSString *const kRNConcurrentRoot = @"concurrentRoot";
//
//@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
//  RCTTurboModuleManager *_turboModuleManager;
//  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
//  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
//  facebook::react::ContextContainer::Shared _contextContainer;
//}
//@end
//#endif
//
//@implementation AppDelegate
//
//
//- (BOOL)application:(UIApplication *)application
//   openURL:(NSURL *)url
//   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
//{
//  return [RCTLinkingManager application:application openURL:url options:options];
//}
//
//
//
//// - (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
//// restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
//// {
//// return [RCTLinkingManager application:application
////                  continueUserActivity:userActivity
////                    restorationHandler:restorationHandler];
//// } ********
//
//
//- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
//  restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
//{
//  return [RCTLinkingManager application:application
//                  continueUserActivity:userActivity
//                    restorationHandler:restorationHandler];
//}
//
//// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
//// {
////  // Add me --- \/
////
////   NSString *rootPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
////
////   NSLog(@"File and Directory Structure:");
////   [self printDirectoryStructureFromPath:rootPath withIndentation:@""];
////
////   [FIRApp configure];
////   [self registerForRemoteNotifications];
////   // Add me --- /\ ********
//
//
////- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
////{
////  // Log directory structure
////  NSString *rootPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
////  NSLog(@"File and Directory Structure:");
////  [self printDirectoryStructureFromPath:rootPath withIndentation:@""];
////
////  [FIRApp configure];
////  [self registerForRemoteNotifications];
////
////  // Handle launch from push notification
////  if (launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey]) {
////    NSDictionary *userInfo = launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey];
////    [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo];
////  }
////
////
//
//- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
//{
//  // Log directory structure
//  NSString *rootPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
//  NSLog(@"File and Directory Structure:");
//  [self printDirectoryStructureFromPath:rootPath withIndentation:@""];
//
//  [FIRApp configure];
//  [self registerForRemoteNotifications];
//
//  // Handle push notification tap when launching the app
//  if (launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey]) {
//    NSDictionary *userInfo = launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey];
//    [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo];
//
//    // Post event to React Native
//    [[NSNotificationCenter defaultCenter] postNotificationName:@"NotificationClicked"
//                                                        object:nil
//                                                      userInfo:userInfo];
//  }
//
//
////  - (void)userNotificationCenter:(UNUserNotificationCenter *)center
////  didReceiveNotificationResponse:(UNNotificationResponse *)response
////            withCompletionHandler:(void (^)(void))completionHandler {
////
////      NSDictionary *userInfo = response.notification.request.content.userInfo;
////      NSLog(@"🔔 APNS Notification Clicked: %@", userInfo);
////
////      // Post event to React Native
////      [[NSNotificationCenter defaultCenter] postNotificationName:@"NotificationClicked"
////                                                          object:nil
////                                                        userInfo:userInfo];
////
////      completionHandler();
////  }
//
//
//  RCTAppSetupPrepareApp(application);
//
//  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
//
//#if RCT_NEW_ARCH_ENABLED
//  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
//  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
//  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
//  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
//  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
//#endif
//
//  NSDictionary *initProps = [self prepareInitialProps];
//  UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"godrej.boyce", initProps);
//
//  if (@available(iOS 13.0, *)) {
//    rootView.backgroundColor = [UIColor systemBackgroundColor];
//  } else {
//    rootView.backgroundColor = [UIColor whiteColor];
//  }
//
//  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIViewController *rootViewController = [UIViewController new];
//  rootViewController.view = rootView;
//  self.window.rootViewController = rootViewController;
//  [self.window makeKeyAndVisible];
//  return YES;
//}
//- (void)registerForRemoteNotifications {
//   UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//   center.delegate = self; // Set the notification center delegate
//   // Request notification permissions
//   [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge)
//                         completionHandler:^(BOOL granted, NSError * _Nullable error) {
//     if (granted) {
//       dispatch_async(dispatch_get_main_queue(), ^{
//         [[UIApplication sharedApplication] registerForRemoteNotifications];
//       });
//     } else {
//       NSLog(@"Notification permission not granted: %@", error.localizedDescription);
//     }
//   }];
//}
//
//
//
//// Method to print directory structure
//- (void)printDirectoryStructureFromPath:(NSString *)path withIndentation:(NSString *)indentation {
//     NSFileManager *fileManager = [NSFileManager defaultManager];
//     NSError *error = nil;
//
//     // Get the list of files and directories
//     NSArray *contents = [fileManager contentsOfDirectoryAtPath:path error:&error];
//
//     if (error) {
//         NSLog(@"Error reading directory at %@: %@", path, error.localizedDescription);
//         return;
//     }
//
//     for (NSString *item in contents) {
//         // Construct full path for the item
//         NSString *itemPath = [path stringByAppendingPathComponent:item];
//         BOOL isDirectory = NO;
//
//         // Check if the item is a directory
//         if ([fileManager fileExistsAtPath:itemPath isDirectory:&isDirectory]) {
//             // Print the current item
//             NSLog(@"%@%@", indentation, item);
//
//             // If it's a directory, recursively call this method
//             if (isDirectory) {
//                 NSString *newIndentation = [indentation stringByAppendingString:@"  "];
//                 [self printDirectoryStructureFromPath:itemPath withIndentation:newIndentation];
//             }
//         }
//     }
//}
//
//- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
//   const unsigned char *tokenBytes = (const unsigned char *)[deviceToken bytes];
//   NSMutableString *deviceTokenString = [NSMutableString string];
//
//   for (NSUInteger i = 0; i < deviceToken.length; i++) {
//     [deviceTokenString appendFormat:@"%02x", tokenBytes[i]];
//   }
//
//   // Call setToken to set the device token
//   [[NotificationModule shared] setDeviceToken:deviceTokenString];
//}
//
//
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////
////    // Get the notification content
////    UNNotificationContent *content = response.notification.request.content;
////    NSString *title = content.title;
////    NSString *body = content.body;
////    NSDate *timestamp = [NSDate date]; // You can use a timestamp from your payload if available
////
////    // Load existing notifications from UserDefaults
////    NSMutableArray *storedNotifications = [[[NSUserDefaults standardUserDefaults] arrayForKey:@"StoredNotifications"] mutableCopy];
////    if (!storedNotifications) {
////        storedNotifications = [NSMutableArray array];
////    }
////
////    // Create a dictionary entry for the notification
////    NSDictionary *notificationEntry = @{
////        @"title": title,
////        @"body": body,
////        @"timestamp": timestamp
////    };
////
////    // Add the new notification to the stored array
////    [storedNotifications addObject:notificationEntry];
////    [[NSUserDefaults standardUserDefaults] setObject:storedNotifications forKey:@"StoredNotifications"];
////    [[NSUserDefaults standardUserDefaults] synchronize];
////
////    NSLog(@"Saved notification: %@ - %@", title, body);
////
////    // Present the Notification Center screen
////    UIViewController *rootVC = [UIApplication sharedApplication].delegate.window.rootViewController;
////
////    // Instantiate your NotificationListViewController (make sure it is implemented)
////    NotificationListViewController *notificationCenterVC = [[NotificationListViewController alloc] init];
////
////    // If the root view controller is a navigation controller, push the new view controller.
////    if ([rootVC isKindOfClass:[UINavigationController class]]) {
////        [(UINavigationController *)rootVC pushViewController:notificationCenterVC animated:YES];
////    } else if (rootVC.navigationController) {
////        [rootVC.navigationController pushViewController:notificationCenterVC animated:YES];
////    } else {
////        // Otherwise, present it modally.
////        [rootVC presentViewController:notificationCenterVC animated:YES completion:nil];
////    }
////
////    completionHandler();
////} rainmaker code
//
//
//
//// // Notification response handling
//// - (void)userNotificationCenter:(UNUserNotificationCenter *)center
//// didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////   NSDictionary *userInfo = response.notification.request.content.userInfo;
////   completionHandler();
//// }
////
//// // Silent notification handling
//// - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//// fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
////   completionHandler(UIBackgroundFetchResultNewData);
//// }
//// /// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
//// ///
//// /// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
//// /// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
//// /// @return: `true` if the `concurrentRoot` feture is enabled. Otherwise, it returns `false`.
//// - (BOOL)concurrentRootEnabled
//// {
////  // Switch this bool to turn on and off the concurrent root
////  return true;
//// }
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////
////    // Save the notification payload to NSUserDefaults here…
////    // (Your saving code remains unchanged)
////
////    NSLog(@"Presenting NotificationListViewController");
////
////    UIViewController *rootVC = [UIApplication sharedApplication].delegate.window.rootViewController;
////    NotificationListViewController *notificationVC = [[NotificationListViewController alloc] init];
////
////    if ([rootVC isKindOfClass:[UINavigationController class]]) {
////        [(UINavigationController *)rootVC pushViewController:notificationVC animated:YES];
////    } else if (rootVC.navigationController) {
////        [rootVC.navigationController pushViewController:notificationVC animated:YES];
////    } else {
////        [rootVC presentViewController:notificationVC animated:YES completion:nil];
////    }
////
////    completionHandler();
////}
//
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////  NSDictionary *userInfo = response.notification.request.content.userInfo;
////  NSLog(@"Received foreground notification....: %@", userInfo);
////
////  // Handle the foreground notification here (e.g., show a custom alert, trigger navigation)
////  completionHandler();
////}immmpppp
//
//
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////         didReceiveNotificationResponse:(UNNotificationResponse *)response
////                   withCompletionHandler:(void (^)(void))completionHandler {
////  NSDictionary *userInfo = response.notification.request.content.userInfo;
////  NSLog(@"Received foreground notification: %@", userInfo);
////
////  // Here, we post a custom notification to React Native for navigation
////  // Ensure your React Native event emitter is set up to handle this event
////  [[NSNotificationCenter defaultCenter] postNotificationName:@"NavigateToNotificationCenter"
////                                                      object:nil
////                                                    userInfo:userInfo];
////  completionHandler();
////}
////
//
//// Background and Silent Notification Handling (when app is in the background or closed)
//// Merge the two methods into one.
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
//  // This method handles both background and silent notifications.
//  NSLog(@"Received background/silent notification: %@", userInfo);
//
//  // You can perform background tasks like data sync here, or decide whether to show an alert.
//  completionHandler(UIBackgroundFetchResultNewData);  // Indicate new data was fetched or handled.
//}
//
//
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center
//  didReceiveNotificationResponse:(UNNotificationResponse *)response
//            withCompletionHandler:(void (^)(void))completionHandler {
//
//  NSDictionary *userInfo = response.notification.request.content.userInfo;
//
//  // Log the notification details
//  NSLog(@"Received foreground notification: %@", userInfo);
//
//  // Check if there's a 'navigateTo' key in the notification payload
//  NSString *screenToNavigate = userInfo[@"navigateTo"];
////  if ([screenToNavigate isEqualToString:@"NotificationCenterScreen"]) {
////    // Post an event to React Native to navigate to the NotificationCenterScreen
////    [[NSNotificationCenter defaultCenter] postNotificationName:@"NavigateToNotificationCenter"
////                                                        object:nil
////                                                      userInfo:userInfo];
////    NSLog(@"Navigating to NotificationCenterScreen...");
////  }
//  if (screenToNavigate == nil || [screenToNavigate isEqualToString:@"NotificationCenterScreen"]) {
//    // Post an event to React Native to navigate to the NotificationCenterScreen
//    [[NSNotificationCenter defaultCenter] postNotificationName:@"NavigateToNotificationCenter"
//                                                        object:nil
//                                                      userInfo:userInfo];
//    NSLog(@"Navigating to NotificationCenterScreen...");
//  }
//
//
//  // Always call completionHandler when done
//  completionHandler();
//}
//
//
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////  didReceiveNotificationResponse:(UNNotificationResponse *)response
////            withCompletionHandler:(void (^)(void))completionHandler {
////
////  NSDictionary *userInfo = response.notification.request.content.userInfo;
////
////  // Log the notification details
////  NSLog(@"Received foreground notification: %@", userInfo);
////
////  // Check if there's a 'navigateTo' key in the notification payload or force the navigation
////  // If it's not there, we will just navigate to NotificationCenterScreen by default.
////  NSString *screenToNavigate = userInfo[@"navigateTo"];
////
////  // You can modify the condition as per your needs, or always navigate to "NotificationCenterScreen".
////  if (screenToNavigate == nil || [screenToNavigate isEqualToString:@"NotificationCenterScreen"]) {
////    // Post an event to React Native to navigate to the NotificationCenterScreen
////    [[NSNotificationCenter defaultCenter] postNotificationName:@"NavigateToNotificationCenter"
////                                                        object:nil
////                                                      userInfo:userInfo];
////    NSLog(@"Navigating to NotificationCenterScreen...");
////  }
////
////  // Always call completionHandler when done
////  completionHandler();
////}
//
////- (void)userNotificationCenter:(UNUserNotificationCenter *)center
////didReceiveNotificationResponse:(UNNotificationResponse *)response
////          withCompletionHandler:(void (^)(void))completionHandler {
////
////    NSDictionary *userInfo = response.notification.request.content.userInfo;
////    NSLog(@"🔔 Received Notification in iOS: %@", userInfo);
////
////    if (userInfo) {
////        NSMutableDictionary *modifiedUserInfo = [userInfo mutableCopy];
////        if (![modifiedUserInfo objectForKey:@"screen"]) {
////            [modifiedUserInfo setObject:@"NotificationCenterScreen" forKey:@"screen"];
////        }
////
////        // ✅ Get the NotificationEventEmitter instance and send the event
////        RCTBridge *bridge = [(RCTRootView *)self.window.rootViewController.view bridge];
////        NotificationEventEmitter *eventEmitter = [bridge moduleForClass:[NotificationEventEmitter class]];
////
////        if (eventEmitter != nil) {
////            [eventEmitter sendEventWithInfo:modifiedUserInfo];
////            NSLog(@"📩 Event sent to React Native");
////        } else {
////            NSLog(@"❌ Error: NotificationEventEmitter instance is nil!");
////        }
////    }
////
////    completionHandler();
////}*********
//
//
//// Method to control whether the concurrentRoot feature is turned on or off
//- (BOOL)concurrentRootEnabled {
//  // Switch this bool to turn on and off the concurrent root
//  return true;
//}
//
////
////// Required for deep linking
////- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
////    return [RCTLinkingManager application:application openURL:url options:options];
////}
//
//
//- (NSDictionary *)prepareInitialProps
//{
//  NSMutableDictionary *initProps = [NSMutableDictionary new];
//
//#ifdef RCT_NEW_ARCH_ENABLED
//  initProps[kRNConcurrentRoot] = @([self concurrentRootEnabled]);
//#endif
//
//  return initProps;
//}
//
//- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
//{
//#if DEBUG
//  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
//#else
//  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//#endif
//}
//
//#if RCT_NEW_ARCH_ENABLED
//
//#pragma mark - RCTCxxBridgeDelegate
//
//- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
//{
//  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
//                                                             delegate:self
//                                                            jsInvoker:bridge.jsCallInvoker];
//  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
//}
//
//#pragma mark RCTTurboModuleManagerDelegate
//
//- (Class)getModuleClassFromName:(const char *)name
//{
//  return RCTCoreModulesClassProvider(name);
//}
//
//- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
//                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
//{
//  return nullptr;
//}
//
//- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
//                                                     initParams:
//                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
//{
//  return nullptr;
//}
//
//- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
//{
//  return RCTAppSetupDefaultModuleFromClass(moduleClass);
//}
//
//#endif
//
//@end
 
 
 
 
#import <Firebase.h>
#import "AppDelegate.h"
#import <React/RCTLinkingManager.h>
 
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
 
#import <React/RCTAppSetupUtils.h>
#import <UserNotifications/UserNotifications.h>
#import "godrejboyce-Swift.h"
 
#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>
 
#import <react/config/ReactNativeConfig.h>
 
static NSString *const kRNConcurrentRoot = @"concurrentRoot";
 
@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
RCTTurboModuleManager *_turboModuleManager;
RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif
 
@implementation AppDelegate
 
 
- (BOOL)application:(UIApplication *)application
  openURL:(NSURL *)url
  options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
return [RCTLinkingManager application:application openURL:url options:options];
}
 
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
return [RCTLinkingManager application:application
                 continueUserActivity:userActivity
                   restorationHandler:restorationHandler];
}
 
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
// Add me --- \/
 
  NSString *rootPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
 
  NSLog(@"File and Directory Structure:");
  [self printDirectoryStructureFromPath:rootPath withIndentation:@""];
 
  [FIRApp configure];
  [self registerForRemoteNotifications];
  // Add me --- /\
 
 
 
RCTAppSetupPrepareApp(application);
 
RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
 
#if RCT_NEW_ARCH_ENABLED
_contextContainer = std::make_shared<facebook::react::ContextContainer const>();
_reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
_contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
_bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
#endif
 
NSDictionary *initProps = [self prepareInitialProps];
UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"godrej.boyce", initProps);
 
if (@available(iOS 13.0, *)) {
   rootView.backgroundColor = [UIColor systemBackgroundColor];
} else {
   rootView.backgroundColor = [UIColor whiteColor];
}
 
self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
UIViewController *rootViewController = [UIViewController new];
rootViewController.view = rootView;
self.window.rootViewController = rootViewController;
[self.window makeKeyAndVisible];
return YES;
}
- (void)registerForRemoteNotifications {
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self; // Set the notification center delegate
  // Request notification permissions
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge)
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
      dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication] registerForRemoteNotifications];
      });
    } else {
      NSLog(@"Notification permission not granted: %@", error.localizedDescription);
    }
  }];
}
 
- (void)applicationDidEnterBackground:(UIApplication *)application {
 
}
 
// Method to print directory structure
- (void)printDirectoryStructureFromPath:(NSString *)path withIndentation:(NSString *)indentation {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSError *error = nil;
   
    // Get the list of files and directories
    NSArray *contents = [fileManager contentsOfDirectoryAtPath:path error:&error];
   
    if (error) {
        NSLog(@"Error reading directory at %@: %@", path, error.localizedDescription);
        return;
    }
   
    for (NSString *item in contents) {
        // Construct full path for the item
        NSString *itemPath = [path stringByAppendingPathComponent:item];
        BOOL isDirectory = NO;
       
        // Check if the item is a directory
        if ([fileManager fileExistsAtPath:itemPath isDirectory:&isDirectory]) {
            // Print the current item
            NSLog(@"%@%@", indentation, item);
           
            // If it's a directory, recursively call this method
            if (isDirectory) {
                NSString *newIndentation = [indentation stringByAppendingString:@"  "];
                [self printDirectoryStructureFromPath:itemPath withIndentation:newIndentation];
            }
        }
    }
}
 
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  const unsigned char *tokenBytes = (const unsigned char *)[deviceToken bytes];
  NSMutableString *deviceTokenString = [NSMutableString string];
  
  for (NSUInteger i = 0; i < deviceToken.length; i++) {
    [deviceTokenString appendFormat:@"%02x", tokenBytes[i]];
  }
 
  // Call setToken to set the device token
  [[NotificationModule shared] setDeviceToken:deviceTokenString];
}
 
 
// // Notification response handling
// - (void)userNotificationCenter:(UNUserNotificationCenter *)center
// didReceiveNotificationResponse:(UNNotificationResponse *)response
//          withCompletionHandler:(void (^)(void))completionHandler {
//   NSDictionary *userInfo = response.notification.request.content.userInfo;
//   completionHandler();
// }
//
// // Silent notification handling
// - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
// fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
//   completionHandler(UIBackgroundFetchResultNewData);
// }
// /// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
// ///
// /// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
// /// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
// /// @return: `true` if the `concurrentRoot` feture is enabled. Otherwise, it returns `false`.
// - (BOOL)concurrentRootEnabled
// {
//  // Switch this bool to turn on and off the concurrent root
//  return true;
// }
 
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center
//didReceiveNotificationResponse:(UNNotificationResponse *)response
//          withCompletionHandler:(void (^)(void))completionHandler {
//  NSDictionary *userInfo = response.notification.request.content.userInfo;
//  NSLog(@"Received foreground notification....: %@", userInfo);
//
//  // Handle the foreground notification here (e.g., show a custom alert, trigger navigation)
//  completionHandler();
//}
// Handle foreground notifications
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
      willPresentNotification:(UNNotification *)notification
      withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
 
   NSDictionary *userInfo = notification.request.content.userInfo;
   NSLog(@"📲 Received foreground notification: %@", userInfo);
  
  NSString *screenToNavigate = userInfo[@"navigateTo"];
  
  if (screenToNavigate == nil || [screenToNavigate isEqualToString:@"NotificationCenterScreen"]) {
    // Post an event to React Native to navigate to the NotificationCenterScreen
    [[NSNotificationCenter defaultCenter] postNotificationName:@"NavigateToNotificationCenter"
                                                        object:nil
                                                      userInfo:userInfo];
    NSLog(@"Navigating to NotificationCenterScreen...");
  }
  
 
   // Ensure the notification is displayed while app is in foreground
   completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionSound);
}
 
// Background and Silent Notification Handling (when app is in the background or closed)
// Merge the two methods into one.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
// This method handles both background and silent notifications.
NSLog(@"Received background/silent notification: %@", userInfo);
 
// You can perform background tasks like data sync here, or decide whether to show an alert.
completionHandler(UIBackgroundFetchResultNewData);  // Indicate new data was fetched or handled.
}
 
// Method to control whether the concurrentRoot feature is turned on or off
- (BOOL)concurrentRootEnabled {
// Switch this bool to turn on and off the concurrent root
return true;
}
 
 
 
- (NSDictionary *)prepareInitialProps
{
NSMutableDictionary *initProps = [NSMutableDictionary new];
 
#ifdef RCT_NEW_ARCH_ENABLED
initProps[kRNConcurrentRoot] = @([self concurrentRootEnabled]);
#endif
 
return initProps;
}
 
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
 
#if RCT_NEW_ARCH_ENABLED
 
#pragma mark - RCTCxxBridgeDelegate
 
- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
_turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                            delegate:self
                                                           jsInvoker:bridge.jsCallInvoker];
return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}
 
#pragma mark RCTTurboModuleManagerDelegate
 
- (Class)getModuleClassFromName:(const char *)name
{
return RCTCoreModulesClassProvider(name);
}
 
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
return nullptr;
}
 
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                    initParams:
                                                        (const facebook::react::ObjCTurboModule::InitParams &)params
{
return nullptr;
}
 
- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
return RCTAppSetupDefaultModuleFromClass(moduleClass);
}
 
#endif
 
@end
