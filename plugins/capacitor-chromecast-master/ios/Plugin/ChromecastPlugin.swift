import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */

@objc(ChromecastPlugin)
public class ChromecastPlugin: CAPPlugin {
    private var implementation: Chromecast?

    @objc func initialize(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            self.implementation = Chromecast();
            call.resolve();
        }
    }

    @objc func requestSession(_ call: CAPPluginCall) {
        implementation?.discoveryDevices(fn:{
            call.resolve([
                "conect": "ok"
            ]);
        });
        
    }

    @objc func loadMedia(_ call: CAPPluginCall) {
        implementation?.startStremming(url: call.getString("contentId")!, currentTime:call.getDouble("currentTime")!, poster: call.getString("poster")!, title: call.getString("title")!)
    }
}
