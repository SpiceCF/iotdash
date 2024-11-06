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
 * @interface EntityThermometerConfig
 */
export interface EntityThermometerConfig {
    /**
     * 
     * @type {string}
     * @memberof EntityThermometerConfig
     */
    connection?: string;
    /**
     * 
     * @type {number}
     * @memberof EntityThermometerConfig
     */
    maxTemperature?: number;
    /**
     * 
     * @type {number}
     * @memberof EntityThermometerConfig
     */
    minTemperature?: number;
}

/**
 * Check if a given object implements the EntityThermometerConfig interface.
 */
export function instanceOfEntityThermometerConfig(value: object): value is EntityThermometerConfig {
    return true;
}

export function EntityThermometerConfigFromJSON(json: any): EntityThermometerConfig {
    return EntityThermometerConfigFromJSONTyped(json, false);
}

export function EntityThermometerConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityThermometerConfig {
    if (json == null) {
        return json;
    }
    return {
        
        'connection': json['connection'] == null ? undefined : json['connection'],
        'maxTemperature': json['max_temperature'] == null ? undefined : json['max_temperature'],
        'minTemperature': json['min_temperature'] == null ? undefined : json['min_temperature'],
    };
}

  export function EntityThermometerConfigToJSON(json: any): EntityThermometerConfig {
      return EntityThermometerConfigToJSONTyped(json, false);
  }

  export function EntityThermometerConfigToJSONTyped(value?: EntityThermometerConfig | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'connection': value['connection'],
        'max_temperature': value['maxTemperature'],
        'min_temperature': value['minTemperature'],
    };
}
