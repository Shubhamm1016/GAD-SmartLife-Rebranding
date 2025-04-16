//
//  ESPConfiguration.swift
//  godrejboyce
//
//  Created by poojaran on 09/03/25.
//

import Foundation

class ESPConfiguration {
    
    var appGroupID:String!
    
    init() {
        guard let configDictionary = getCustomPlist() else {
            fatalError("Configuration.plist file is not present. Please check the documents for more information.")
        }
        appGroupID = configDictionary["App Group"] as? String ?? ""
    }
    
    func getCustomPlist() -> [String: Any]? {
        if let path = Bundle.main.path(forResource: "Configuration", ofType: "plist") {
            do {
                let url = URL(fileURLWithPath: path)
                let data = try Data(contentsOf: url)
                if let configPlist = try PropertyListSerialization.propertyList(from: data, options: .mutableContainers, format: nil) as? [String: Any] {
                    return configPlist
                }
            } catch {
                return nil
            }
        }
        return nil
    }
}
