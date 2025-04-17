import Foundation

/// Model representing a Node
struct Node: Codable {
    let node_id: String  // Unique Node Identifier
    let name: String
  
}

struct Nodes: Codable {
    let id: String  // Ensure this property exists
    let name: String
    let status: String
}
