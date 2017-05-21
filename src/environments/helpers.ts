import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as sha1 from 'sha1';

@Injectable()
export class DuedateHelpers {
    generatePasswordHash(pw:string) {
        return sha1(pw);
    }
}
