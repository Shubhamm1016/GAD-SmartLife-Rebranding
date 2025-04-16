//
//  LocalStorage.swift.swift
//  godrejboyce
//
//  Created by poojaran on 11/03/25.
//

import Foundation

class LocalStorage {
    static func getDeviceName(for nodeId: String) -> String? {
        return UserDefaults.standard.string(forKey: "device_name_\(nodeId)")
    }
    
    static func saveDeviceName(nodeId: String, name: String) {
        UserDefaults.standard.set(name, forKey: "device_name_\(nodeId)")
    }
}
