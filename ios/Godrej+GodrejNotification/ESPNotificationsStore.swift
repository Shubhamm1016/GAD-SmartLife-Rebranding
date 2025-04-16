import Foundation
 
// Define ESPLocalStorageKey if missing
struct ESPLocalStorageKey {
    static let suiteName = ESPConfiguration().appGroupID
    static let nodeDetails = "com.espressif.node.details"
    static let notificationStore = "com.espressif.notifications.store"
}
 
// Protocol for managing local storage of notifications.
protocol ESPNotificationsStoreProtocol {
    func getDeliveredESPNotifications() -> [ESPNotifications]?
    func storeESPNotification(notification: ESPNotifications)
    func cleanupNotifications()
}
 
class ESPNotificationsStore: ESPLocalStorage, ESPNotificationsStoreProtocol {
    
    var notificationLimit: Int
    
    init(_ suiteName: String?, _ limit: Int = 200) {
        notificationLimit = limit
        super.init(suiteName)
    }
    
    /// Method to fetch locally stored notifications for the current user.
    ///
    /// - Returns: Array of ESPNotifications object.
    func getDeliveredESPNotifications() -> [ESPNotifications]? {
        if let notificationData = getDataFromSharedUserDefault(key: ESPLocalStorageKey.notificationStore) {
            do {
                var storedNotifications: [ESPNotifications] = []
                storedNotifications = try JSONDecoder().decode([ESPNotifications].self, from: notificationData)
                storedNotifications.sort(by: { $0.timestamp > $1.timestamp})
                return storedNotifications
            } catch {
                print(error)
                return nil
            }
        }
        return nil
    }
    
    /// Method to save notification locally.
    ///
    /// - Parameters:
    ///   - notification: ESPNotifications object.
    func storeESPNotification(notification: ESPNotifications) {
        do {
            var notifications: [ESPNotifications] = []
            notifications.append(contentsOf: getDeliveredESPNotifications() ?? [])
            notifications.insert(notification, at: 0)
            notifications = Array(notifications.prefix(notificationLimit))
            let encoded = try JSONEncoder().encode(notifications)
            saveDataInUserDefault(data: encoded, key: ESPLocalStorageKey.notificationStore)
        } catch {
            print(error)
        }
    }
    
    /// Method to clean up notifications.
    func cleanupNotifications() {
        cleanupData(forKey: ESPLocalStorageKey.notificationStore)
    }
}

