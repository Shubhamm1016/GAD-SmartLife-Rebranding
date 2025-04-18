//#import <React/RCTBridgeDelegate.h>
//#import <UIKit/UIKit.h>
//
//@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
//
//@property (nonatomic, strong) UIWindow *window;
//
//@end

#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end

