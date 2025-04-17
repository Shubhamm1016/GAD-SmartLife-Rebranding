//
//  ESPLocalStorageProtocol.swift
//  godrejboyce
//
//  Created by poojaran on 09/03/25.
//

import Foundation

protocol ESPLocalStorageProtocol {
    func saveDataInUserDefault(data: Data, key: String)
    func getDataFromSharedUserDefault(key: String) -> Data?
    func cleanupData(forKey: String)
}
