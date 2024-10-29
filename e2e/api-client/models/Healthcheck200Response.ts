/* tslint:disable */
/* eslint-disable */
/**
 * IOT DASHBOARD SENSOR MONITORING API
 * API FOR IOT DASHBOARD SENSOR MONITORING
 *
 * The version of the OpenAPI document: 1.0.0
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
 * @interface Healthcheck200Response
 */
export interface Healthcheck200Response {
    /**
     * 
     * @type {string}
     * @memberof Healthcheck200Response
     */
    status?: string;
}

/**
 * Check if a given object implements the Healthcheck200Response interface.
 */
export function instanceOfHealthcheck200Response(value: object): value is Healthcheck200Response {
    return true;
}

export function Healthcheck200ResponseFromJSON(json: any): Healthcheck200Response {
    return Healthcheck200ResponseFromJSONTyped(json, false);
}

export function Healthcheck200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): Healthcheck200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
    };
}

  export function Healthcheck200ResponseToJSON(json: any): Healthcheck200Response {
      return Healthcheck200ResponseToJSONTyped(json, false);
  }

  export function Healthcheck200ResponseToJSONTyped(value?: Healthcheck200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'status': value['status'],
    };
}

