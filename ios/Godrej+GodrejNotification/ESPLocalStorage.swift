//
//  ESPLocalStorage.swift
//  godrejboyce
//
//  Created by poojaran on 09/03/25.
//

import Foundation

// Class that manages the local storage in the app.
class ESPLocalStorage: ESPLocalStorageProtocol {
    
    // Shared user defaults.
    let sharedUserDefaults: UserDefaults?
    
    init(_ suiteName: String?) {
        sharedUserDefaults = UserDefaults(suiteName: suiteName)
    }
    
    /// Method to save data in shared user default.
    ///
    /// - Parameters:
    ///   - data: Data that needs to be saved.
    ///   - key: Key against which data will be stored.
    func saveDataInUserDefault(data: Data, key: String) {
        sharedUserDefaults?.setValue(data, forKey: key)
    }
    
    /// Method to get data from shared user default.
    ///
    /// - Parameters:
    ///   - key: Key against which data is stored.
    /// - Returns: Data.
    func getDataFromSharedUserDefault(key: String) -> Data? {
        return sharedUserDefaults?.object(forKey: key) as? Data
    }
    
    /// Method to clean up data for a particular key.
    ///
    /// - Parameters:
    ///   - forKey: Key for which data will cleaned up.
    func cleanupData(forKey: String) {
        sharedUserDefaults?.removeObject(forKey: forKey)
    }
}
