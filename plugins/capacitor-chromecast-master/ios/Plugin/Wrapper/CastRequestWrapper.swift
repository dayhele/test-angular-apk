//
//  CastRequestWrapper.swift
//  Plugin
//
//  Created by Caio Vasconcelos on 07/08/22.
//

import Foundation
import GoogleCast

class CastRequestWrapper: NSObject {

}

// MARK: - Extension GCKRemoteMediaClientListener

extension CastRequestWrapper: GCKRequestDelegate {
    func requestDidComplete(_ request: GCKRequest) {
        print("#Request: Request")
    }

    func request(_ request: GCKRequest, didAbortWith abortReason: GCKRequestAbortReason) {
        print("#Request: abortReason")
    }

    func request(_ request: GCKRequest, didFailWithError error: GCKError) {
        print("#Request: error")
    }
}
