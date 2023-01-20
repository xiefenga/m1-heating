//
//  main.m
//  mac-temperature
//
//  Created by 0x1461A0 on 2023/1/19.
//

#import <Foundation/Foundation.h>
#import "temperature.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        float temp = getAppleSiliconCPUTemperature();
        NSLog(@"当前 CPU: %f°C", temp);
    }
    return 0;
}
