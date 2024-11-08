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
 * @interface EntitySensorConfig
 */
export interface EntitySensorConfig {
    /**
     * 
     * @type {object}
     * @memberof EntitySensorConfig
     */
    createdAt?: object;
    /**
     * 
     * @type {object}
     * @memberof EntitySensorConfig
     */
    id?: object;
    /**
     * 
     * @type {string}
     * @memberof EntitySensorConfig
     */
    key?: string;
    /**
     * 
     * @type {object}
     * @memberof EntitySensorConfig
     */
    sensorId?: object;
    /**
     * 
     * @type {object}
     * @memberof EntitySensorConfig
     */
    updatedAt?: object;
    /**
     * 
     * @type {Array<number>}
     * @memberof EntitySensorConfig
     */
    value?: Array<number>;
}

/**
 * Check if a given object implements the EntitySensorConfig interface.
 */
export function instanceOfEntitySensorConfig(value: object): value is EntitySensorConfig {
    return true;
}

export function EntitySensorConfigFromJSON(json: any): EntitySensorConfig {
    return EntitySensorConfigFromJSONTyped(json, false);
}

export function EntitySensorConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntitySensorConfig {
    if (json == null) {
        return json;
    }
    return {
        
        'createdAt': json['created_at'] == null ? undefined : json['created_at'],
        'id': json['id'] == null ? undefined : json['id'],
        'key': json['key'] == null ? undefined : json['key'],
        'sensorId': json['sensor_id'] == null ? undefined : json['sensor_id'],
        'updatedAt': json['updated_at'] == null ? undefined : json['updated_at'],
        'value': json['value'] == null ? undefined : json['value'],
    };
}

  export function EntitySensorConfigToJSON(json: any): EntitySensorConfig {
      return EntitySensorConfigToJSONTyped(json, false);
  }

  export function EntitySensorConfigToJSONTyped(value?: EntitySensorConfig | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'created_at': value['createdAt'],
        'id': value['id'],
        'key': value['key'],
        'sensor_id': value['sensorId'],
        'updated_at': value['updatedAt'],
        'value': value['value'],
    };
}

