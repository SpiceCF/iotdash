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
import type { EntityThermometerHistory } from './EntityThermometerHistory';
import {
    EntityThermometerHistoryFromJSON,
    EntityThermometerHistoryFromJSONTyped,
    EntityThermometerHistoryToJSON,
    EntityThermometerHistoryToJSONTyped,
} from './EntityThermometerHistory';

/**
 * 
 * @export
 * @interface SimulatorGetTMHistoryResponse
 */
export interface SimulatorGetTMHistoryResponse {
    /**
     * 
     * @type {Array<EntityThermometerHistory>}
     * @memberof SimulatorGetTMHistoryResponse
     */
    data?: Array<EntityThermometerHistory>;
    /**
     * 
     * @type {number}
     * @memberof SimulatorGetTMHistoryResponse
     */
    status?: number;
}

/**
 * Check if a given object implements the SimulatorGetTMHistoryResponse interface.
 */
export function instanceOfSimulatorGetTMHistoryResponse(value: object): value is SimulatorGetTMHistoryResponse {
    return true;
}

export function SimulatorGetTMHistoryResponseFromJSON(json: any): SimulatorGetTMHistoryResponse {
    return SimulatorGetTMHistoryResponseFromJSONTyped(json, false);
}

export function SimulatorGetTMHistoryResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SimulatorGetTMHistoryResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'data': json['data'] == null ? undefined : ((json['data'] as Array<any>).map(EntityThermometerHistoryFromJSON)),
        'status': json['status'] == null ? undefined : json['status'],
    };
}

  export function SimulatorGetTMHistoryResponseToJSON(json: any): SimulatorGetTMHistoryResponse {
      return SimulatorGetTMHistoryResponseToJSONTyped(json, false);
  }

  export function SimulatorGetTMHistoryResponseToJSONTyped(value?: SimulatorGetTMHistoryResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': value['data'] == null ? undefined : ((value['data'] as Array<any>).map(EntityThermometerHistoryToJSON)),
        'status': value['status'],
    };
}

