/* tslint:disable */
/* eslint-disable */
/**
 * Example API Doc
 * Describe your API
 *
 * The version of the OpenAPI document: SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { DomainSensor } from './DomainSensor';
import {
    DomainSensorFromJSON,
    DomainSensorFromJSONTyped,
    DomainSensorToJSON,
    DomainSensorToJSONTyped,
} from './DomainSensor';

/**
 * 
 * @export
 * @interface SensorhandlerListSensorsResponse
 */
export interface SensorhandlerListSensorsResponse {
    /**
     * 
     * @type {Array<DomainSensor>}
     * @memberof SensorhandlerListSensorsResponse
     */
    data?: Array<DomainSensor>;
    /**
     * 
     * @type {string}
     * @memberof SensorhandlerListSensorsResponse
     */
    status?: string;
}

/**
 * Check if a given object implements the SensorhandlerListSensorsResponse interface.
 */
export function instanceOfSensorhandlerListSensorsResponse(value: object): value is SensorhandlerListSensorsResponse {
    return true;
}

export function SensorhandlerListSensorsResponseFromJSON(json: any): SensorhandlerListSensorsResponse {
    return SensorhandlerListSensorsResponseFromJSONTyped(json, false);
}

export function SensorhandlerListSensorsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SensorhandlerListSensorsResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'data': json['data'] == null ? undefined : ((json['data'] as Array<any>).map(DomainSensorFromJSON)),
        'status': json['status'] == null ? undefined : json['status'],
    };
}

  export function SensorhandlerListSensorsResponseToJSON(json: any): SensorhandlerListSensorsResponse {
      return SensorhandlerListSensorsResponseToJSONTyped(json, false);
  }

  export function SensorhandlerListSensorsResponseToJSONTyped(value?: SensorhandlerListSensorsResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': value['data'] == null ? undefined : ((value['data'] as Array<any>).map(DomainSensorToJSON)),
        'status': value['status'],
    };
}

