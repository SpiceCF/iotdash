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
import type { EntitySensorConfig } from './EntitySensorConfig';
import {
    EntitySensorConfigFromJSON,
    EntitySensorConfigFromJSONTyped,
    EntitySensorConfigToJSON,
    EntitySensorConfigToJSONTyped,
} from './EntitySensorConfig';

/**
 * 
 * @export
 * @interface EntitySensor
 */
export interface EntitySensor {
    /**
     * 
     * @type {Array<EntitySensorConfig>}
     * @memberof EntitySensor
     */
    configs?: Array<EntitySensorConfig>;
    /**
     * 
     * @type {object}
     * @memberof EntitySensor
     */
    createdAt?: object;
    /**
     * 
     * @type {object}
     * @memberof EntitySensor
     */
    deviceId?: object;
    /**
     * 
     * @type {object}
     * @memberof EntitySensor
     */
    id?: object;
    /**
     * 
     * @type {string}
     * @memberof EntitySensor
     */
    name?: string;
    /**
     * 
     * @type {object}
     * @memberof EntitySensor
     */
    ownerId?: object;
    /**
     * 
     * @type {string}
     * @memberof EntitySensor
     */
    type?: string;
    /**
     * 
     * @type {object}
     * @memberof EntitySensor
     */
    updatedAt?: object;
}

/**
 * Check if a given object implements the EntitySensor interface.
 */
export function instanceOfEntitySensor(value: object): value is EntitySensor {
    return true;
}

export function EntitySensorFromJSON(json: any): EntitySensor {
    return EntitySensorFromJSONTyped(json, false);
}

export function EntitySensorFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntitySensor {
    if (json == null) {
        return json;
    }
    return {
        
        'configs': json['configs'] == null ? undefined : ((json['configs'] as Array<any>).map(EntitySensorConfigFromJSON)),
        'createdAt': json['created_at'] == null ? undefined : json['created_at'],
        'deviceId': json['device_id'] == null ? undefined : json['device_id'],
        'id': json['id'] == null ? undefined : json['id'],
        'name': json['name'] == null ? undefined : json['name'],
        'ownerId': json['owner_id'] == null ? undefined : json['owner_id'],
        'type': json['type'] == null ? undefined : json['type'],
        'updatedAt': json['updated_at'] == null ? undefined : json['updated_at'],
    };
}

  export function EntitySensorToJSON(json: any): EntitySensor {
      return EntitySensorToJSONTyped(json, false);
  }

  export function EntitySensorToJSONTyped(value?: EntitySensor | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'configs': value['configs'] == null ? undefined : ((value['configs'] as Array<any>).map(EntitySensorConfigToJSON)),
        'created_at': value['createdAt'],
        'device_id': value['deviceId'],
        'id': value['id'],
        'name': value['name'],
        'owner_id': value['ownerId'],
        'type': value['type'],
        'updated_at': value['updatedAt'],
    };
}
