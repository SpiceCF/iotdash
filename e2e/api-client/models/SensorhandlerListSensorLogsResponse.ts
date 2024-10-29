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
import type { DomainSensorLog } from './DomainSensorLog';
import {
    DomainSensorLogFromJSON,
    DomainSensorLogFromJSONTyped,
    DomainSensorLogToJSON,
    DomainSensorLogToJSONTyped,
} from './DomainSensorLog';

/**
 * 
 * @export
 * @interface SensorhandlerListSensorLogsResponse
 */
export interface SensorhandlerListSensorLogsResponse {
    /**
     * 
     * @type {Array<DomainSensorLog>}
     * @memberof SensorhandlerListSensorLogsResponse
     */
    data?: Array<DomainSensorLog>;
    /**
     * 
     * @type {string}
     * @memberof SensorhandlerListSensorLogsResponse
     */
    status?: string;
}

/**
 * Check if a given object implements the SensorhandlerListSensorLogsResponse interface.
 */
export function instanceOfSensorhandlerListSensorLogsResponse(value: object): value is SensorhandlerListSensorLogsResponse {
    return true;
}

export function SensorhandlerListSensorLogsResponseFromJSON(json: any): SensorhandlerListSensorLogsResponse {
    return SensorhandlerListSensorLogsResponseFromJSONTyped(json, false);
}

export function SensorhandlerListSensorLogsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SensorhandlerListSensorLogsResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'data': json['data'] == null ? undefined : ((json['data'] as Array<any>).map(DomainSensorLogFromJSON)),
        'status': json['status'] == null ? undefined : json['status'],
    };
}

  export function SensorhandlerListSensorLogsResponseToJSON(json: any): SensorhandlerListSensorLogsResponse {
      return SensorhandlerListSensorLogsResponseToJSONTyped(json, false);
  }

  export function SensorhandlerListSensorLogsResponseToJSONTyped(value?: SensorhandlerListSensorLogsResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': value['data'] == null ? undefined : ((value['data'] as Array<any>).map(DomainSensorLogToJSON)),
        'status': value['status'],
    };
}

