#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(ChromecastPlugin, "Chromecast",
           CAP_PLUGIN_METHOD(initialize, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(requestSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(loadMedia, CAPPluginReturnPromise);
)
