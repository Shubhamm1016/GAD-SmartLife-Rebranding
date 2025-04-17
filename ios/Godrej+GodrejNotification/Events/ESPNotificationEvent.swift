//
//  ESPNotificationEvent.swift
//  godrejboyce
//
//  Created by poojaran on 09/03/25.
//

import Foundation

// Define ESPLocalStorageKeys if missing
struct ESPLocalStorageKeys {
    static let suiteName = "group.com.godrej.boyce" // Replace if needed
}

// Base class for all notification events
class ESPNotificationEvent: ESPNotificationProtocol {
    var eventData: [String: Any]
    var notification: ESPNotifications
    let notificationStore = ESPNotificationsStore(ESPLocalStorageKeys.suiteName)

    init(_ eventDataObject: [String: Any], _ notificationObject: ESPNotifications) {
        eventData = eventDataObject
      notification = notificationObject
    }

    // Abstract method to modify content based on event type
    func modifiedContent() -> ESPNotifications? {
        return nil
    }
}
