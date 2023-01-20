//
//  temperature.m
//  mac-temperature
//
//  Created by 0x1461A0 on 2023/1/19.
//

#import <Foundation/Foundation.h>
#import "temperature.h"
#import "smc/appleSmc.h"
#import "smc/appleSmc2.h"

typedef char              UInt32Char_t[5];
typedef unsigned char     SMCBytes_t[32];

UInt32Char_t cpuTempKeyM1[] = {
    "Tp09","Tp0T","Tp01",
    "Tp05","Tp0D","Tp0H",
    "Tp0L","Tc0a","Tc0b",
    "Tc0x","Tc0z","Tc7a",
    "Tc7b","Tc7x","Tc7z",
    "Tc8a","Tc8b","Tc9a",
    "Tc9b","Tc9x","Tc9z",
};


// get cpu temperature for apple silicon
float getAppleSiliconCPUTemperature() {
    float temp = 0;
    for (int i = 0; i < 14; i++) {
        UInt32Char_t key;
        strcpy(key, cpuTempKeyM1[i]);
        SMCVal_t val;
        io_connect_t conn = GetSmcConnect();
        int ret = SMCReadKey2(key, &val, conn);
        if (ret == kIOReturnSuccess) {
            float result = parseSMCVal(val);
            temp = result > temp ? result : temp;
        }
    }
    return temp;
}

