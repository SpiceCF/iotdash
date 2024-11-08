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
/**
 * 
 * @export
 * @interface SimulatorEngineSwitchResponse
 */
export interface SimulatorEngineSwitchResponse {
    /**
     * 
     * @type {string}
     * @memberof SimulatorEngineSwitchResponse
     */
    message?: string;
    /**
     * 
     * @type {number}
     * @memberof SimulatorEngineSwitchResponse
     */
    status?: number;
}

/**
 * Check if a given object implements the SimulatorEngineSwitchResponse interface.
 */
export function instanceOfSimulatorEngineSwitchResponse(value: object): value is SimulatorEngineSwitchResponse {
    return true;
}

export function SimulatorEngineSwitchResponseFromJSON(json: any): SimulatorEngineSwitchResponse {
    return SimulatorEngineSwitchResponseFromJSONTyped(json, false);
}

export function SimulatorEngineSwitchResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SimulatorEngineSwitchResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['message'] == null ? undefined : json['message'],
        'status': json['status'] == null ? undefined : json['status'],
    };
}

  export function SimulatorEngineSwitchResponseToJSON(json: any): SimulatorEngineSwitchResponse {
      return SimulatorEngineSwitchResponseToJSONTyped(json, false);
  }

  export function SimulatorEngineSwitchResponseToJSONTyped(value?: SimulatorEngineSwitchResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'message': value['message'],
        'status': value['status'],
    };
}

