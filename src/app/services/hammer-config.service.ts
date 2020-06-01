import * as Hammer from "hammerjs";
import { HammerGestureConfig } from "@angular/platform-browser";

export class HammerConfig extends HammerGestureConfig {
    overrides = {
        pinch: { enable: false },
        rotate: { enable: false },
        swipe: {direction: Hammer.DIRECTION_ALL}
    }
}
