//
//  CastLoggerWrapper.swift
//  Plugin
//
//  Created by Caio Vasconcelos on 07/08/22.
//

import Foundation
import GoogleCast

class CastLoggerWrapper: NSObject {

    // MARK: - Properties

    private var enableSDKLogging: Bool = true

    // MARK: - Init

    init(enableSDKLogging: Bool) {
        super.init()
        self.enableSDKLogging = enableSDKLogging
        let logFilter = GCKLoggerFilter()
        let classesToLog = ["GCKDeviceScanner", "GCKDeviceProvider", "GCKDiscoveryManager", "GCKCastChannel",
                            "GCKMediaControlChannel", "GCKUICastButton", "GCKUIMediaController", "NSMutableDictionary"]
        logFilter.setLoggingLevel(.verbose, forClasses: classesToLog)
        GCKLogger.sharedInstance().filter = logFilter
        GCKLogger.sharedInstance().delegate = self
    }

    // MARK: - Functions

    func enabledLogging(enable: Bool) {
        enableSDKLogging = enable
    }
}

// MARK: - Extension GCKLoggerDelegate

extension CastLoggerWrapper: GCKLoggerDelegate {
    public func logMessage(_ message: String,
                           at level: GCKLoggerLevel,
                           fromFunction function: String,
                           location: String) {
        if enableSDKLogging {
            print("\(location): \(function) - \(message)")
        }
    }
}
