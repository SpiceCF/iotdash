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
 * @interface SimulatorhandlerStopEngineResponse
 */
export interface SimulatorhandlerStopEngineResponse {
    /**
     * 
     * @type {string}
     * @memberof SimulatorhandlerStopEngineResponse
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof SimulatorhandlerStopEngineResponse
     */
    status?: string;
}

/**
 * Check if a given object implements the SimulatorhandlerStopEngineResponse interface.
 */
export function instanceOfSimulatorhandlerStopEngineResponse(value: object): value is SimulatorhandlerStopEngineResponse {
    return true;
}

export function SimulatorhandlerStopEngineResponseFromJSON(json: any): SimulatorhandlerStopEngineResponse {
    return SimulatorhandlerStopEngineResponseFromJSONTyped(json, false);
}

export function SimulatorhandlerStopEngineResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SimulatorhandlerStopEngineResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['message'] == null ? undefined : json['message'],
        'status': json['status'] == null ? undefined : json['status'],
    };
}

  export function SimulatorhandlerStopEngineResponseToJSON(json: any): SimulatorhandlerStopEngineResponse {
      return SimulatorhandlerStopEngineResponseToJSONTyped(json, false);
  }

  export function SimulatorhandlerStopEngineResponseToJSONTyped(value?: SimulatorhandlerStopEngineResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'message': value['message'],
        'status': value['status'],
    };
}

