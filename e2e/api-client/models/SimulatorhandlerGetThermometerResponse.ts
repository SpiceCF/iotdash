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
import type { DomainThermometer } from './DomainThermometer';
import {
    DomainThermometerFromJSON,
    DomainThermometerFromJSONTyped,
    DomainThermometerToJSON,
    DomainThermometerToJSONTyped,
} from './DomainThermometer';

/**
 * 
 * @export
 * @interface SimulatorhandlerGetThermometerResponse
 */
export interface SimulatorhandlerGetThermometerResponse {
    /**
     * 
     * @type {DomainThermometer}
     * @memberof SimulatorhandlerGetThermometerResponse
     */
    data?: DomainThermometer;
    /**
     * 
     * @type {number}
     * @memberof SimulatorhandlerGetThermometerResponse
     */
    status?: number;
}

/**
 * Check if a given object implements the SimulatorhandlerGetThermometerResponse interface.
 */
export function instanceOfSimulatorhandlerGetThermometerResponse(value: object): value is SimulatorhandlerGetThermometerResponse {
    return true;
}

export function SimulatorhandlerGetThermometerResponseFromJSON(json: any): SimulatorhandlerGetThermometerResponse {
    return SimulatorhandlerGetThermometerResponseFromJSONTyped(json, false);
}

export function SimulatorhandlerGetThermometerResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SimulatorhandlerGetThermometerResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'data': json['data'] == null ? undefined : DomainThermometerFromJSON(json['data']),
        'status': json['status'] == null ? undefined : json['status'],
    };
}

  export function SimulatorhandlerGetThermometerResponseToJSON(json: any): SimulatorhandlerGetThermometerResponse {
      return SimulatorhandlerGetThermometerResponseToJSONTyped(json, false);
  }

  export function SimulatorhandlerGetThermometerResponseToJSONTyped(value?: SimulatorhandlerGetThermometerResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': DomainThermometerToJSON(value['data']),
        'status': value['status'],
    };
}
