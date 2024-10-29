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
 * @interface AuthLoginRequest
 */
export interface AuthLoginRequest {
    /**
     * 
     * @type {string}
     * @memberof AuthLoginRequest
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthLoginRequest
     */
    password?: string;
}

/**
 * Check if a given object implements the AuthLoginRequest interface.
 */
export function instanceOfAuthLoginRequest(value: object): value is AuthLoginRequest {
    return true;
}

export function AuthLoginRequestFromJSON(json: any): AuthLoginRequest {
    return AuthLoginRequestFromJSONTyped(json, false);
}

export function AuthLoginRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthLoginRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'username': json['username'] == null ? undefined : json['username'],
        'password': json['password'] == null ? undefined : json['password'],
    };
}

  export function AuthLoginRequestToJSON(json: any): AuthLoginRequest {
      return AuthLoginRequestToJSONTyped(json, false);
  }

  export function AuthLoginRequestToJSONTyped(value?: AuthLoginRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'username': value['username'],
        'password': value['password'],
    };
}
