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
 * @interface AuthLoginErrorResponseData
 */
export interface AuthLoginErrorResponseData {
    /**
     * 
     * @type {string}
     * @memberof AuthLoginErrorResponseData
     */
    token?: string;
}

/**
 * Check if a given object implements the AuthLoginErrorResponseData interface.
 */
export function instanceOfAuthLoginErrorResponseData(value: object): value is AuthLoginErrorResponseData {
    return true;
}

export function AuthLoginErrorResponseDataFromJSON(json: any): AuthLoginErrorResponseData {
    return AuthLoginErrorResponseDataFromJSONTyped(json, false);
}

export function AuthLoginErrorResponseDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthLoginErrorResponseData {
    if (json == null) {
        return json;
    }
    return {
        
        'token': json['token'] == null ? undefined : json['token'],
    };
}

  export function AuthLoginErrorResponseDataToJSON(json: any): AuthLoginErrorResponseData {
      return AuthLoginErrorResponseDataToJSONTyped(json, false);
  }

  export function AuthLoginErrorResponseDataToJSONTyped(value?: AuthLoginErrorResponseData | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'token': value['token'],
    };
}

