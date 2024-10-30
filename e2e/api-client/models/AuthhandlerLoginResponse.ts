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
import type { AuthhandlerLoginErrorResponseData } from './AuthhandlerLoginErrorResponseData';
import {
    AuthhandlerLoginErrorResponseDataFromJSON,
    AuthhandlerLoginErrorResponseDataFromJSONTyped,
    AuthhandlerLoginErrorResponseDataToJSON,
    AuthhandlerLoginErrorResponseDataToJSONTyped,
} from './AuthhandlerLoginErrorResponseData';

/**
 * 
 * @export
 * @interface AuthhandlerLoginResponse
 */
export interface AuthhandlerLoginResponse {
    /**
     * 
     * @type {AuthhandlerLoginErrorResponseData}
     * @memberof AuthhandlerLoginResponse
     */
    data?: AuthhandlerLoginErrorResponseData;
    /**
     * 
     * @type {number}
     * @memberof AuthhandlerLoginResponse
     */
    status?: number;
}

/**
 * Check if a given object implements the AuthhandlerLoginResponse interface.
 */
export function instanceOfAuthhandlerLoginResponse(value: object): value is AuthhandlerLoginResponse {
    return true;
}

export function AuthhandlerLoginResponseFromJSON(json: any): AuthhandlerLoginResponse {
    return AuthhandlerLoginResponseFromJSONTyped(json, false);
}

export function AuthhandlerLoginResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthhandlerLoginResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'data': json['data'] == null ? undefined : AuthhandlerLoginErrorResponseDataFromJSON(json['data']),
        'status': json['status'] == null ? undefined : json['status'],
    };
}

  export function AuthhandlerLoginResponseToJSON(json: any): AuthhandlerLoginResponse {
      return AuthhandlerLoginResponseToJSONTyped(json, false);
  }

  export function AuthhandlerLoginResponseToJSONTyped(value?: AuthhandlerLoginResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': AuthhandlerLoginErrorResponseDataToJSON(value['data']),
        'status': value['status'],
    };
}

