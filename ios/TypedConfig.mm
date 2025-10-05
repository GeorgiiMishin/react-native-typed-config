#import "TypedConfig.h"
#import "GeneratedConfig.m"

@implementation TypedConfig
RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeTypedConfigSpecJSI>(params);
}

- (NSDictionary *)getAllValues
{
    return DOT_ENV;
}

@end

