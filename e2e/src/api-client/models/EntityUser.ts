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
import type { EntitySensor } from './EntitySensor';
import {
    EntitySensorFromJSON,
    EntitySensorFromJSONTyped,
    EntitySensorToJSON,
    EntitySensorToJSONTyped,
} from './EntitySensor';
import type { EntityThermometer } from './EntityThermometer';
import {
    EntityThermometerFromJSON,
    EntityThermometerFromJSONTyped,
    EntityThermometerToJSON,
    EntityThermometerToJSONTyped,
} from './EntityThermometer';
import type { EntityUserSetting } from './EntityUserSetting';
import {
    EntityUserSettingFromJSON,
    EntityUserSettingFromJSONTyped,
    EntityUserSettingToJSON,
    EntityUserSettingToJSONTyped,
} from './EntityUserSetting';

/**
 * 
 * @export
 * @interface EntityUser
 */
export interface EntityUser {
    /**
     * 
     * @type {object}
     * @memberof EntityUser
     */
    createdAt?: object;
    /**
     * 
     * @type {string}
     * @memberof EntityUser
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof EntityUser
     */
    fullName?: string;
    /**
     * 
     * @type {object}
     * @memberof EntityUser
     */
    id?: object;
    /**
     * 
     * @type {string}
     * @memberof EntityUser
     */
    password?: string;
    /**
     * 
     * @type {Array<EntitySensor>}
     * @memberof EntityUser
     */
    sensors?: Array<EntitySensor>;
    /**
     * 
     * @type {Array<EntityUserSetting>}
     * @memberof EntityUser
     */
    settings?: Array<EntityUserSetting>;
    /**
     * 
     * @type {Array<EntityThermometer>}
     * @memberof EntityUser
     */
    thermometers?: Array<EntityThermometer>;
    /**
     * 
     * @type {object}
     * @memberof EntityUser
     */
    updatedAt?: object;
    /**
     * 
     * @type {string}
     * @memberof EntityUser
     */
    username?: string;
}

/**
 * Check if a given object implements the EntityUser interface.
 */
export function instanceOfEntityUser(value: object): value is EntityUser {
    return true;
}

export function EntityUserFromJSON(json: any): EntityUser {
    return EntityUserFromJSONTyped(json, false);
}

export function EntityUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityUser {
    if (json == null) {
        return json;
    }
    return {
        
        'createdAt': json['created_at'] == null ? undefined : json['created_at'],
        'email': json['email'] == null ? undefined : json['email'],
        'fullName': json['full_name'] == null ? undefined : json['full_name'],
        'id': json['id'] == null ? undefined : json['id'],
        'password': json['password'] == null ? undefined : json['password'],
        'sensors': json['sensors'] == null ? undefined : ((json['sensors'] as Array<any>).map(EntitySensorFromJSON)),
        'settings': json['settings'] == null ? undefined : ((json['settings'] as Array<any>).map(EntityUserSettingFromJSON)),
        'thermometers': json['thermometers'] == null ? undefined : ((json['thermometers'] as Array<any>).map(EntityThermometerFromJSON)),
        'updatedAt': json['updated_at'] == null ? undefined : json['updated_at'],
        'username': json['username'] == null ? undefined : json['username'],
    };
}

  export function EntityUserToJSON(json: any): EntityUser {
      return EntityUserToJSONTyped(json, false);
  }

  export function EntityUserToJSONTyped(value?: EntityUser | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'created_at': value['createdAt'],
        'email': value['email'],
        'full_name': value['fullName'],
        'id': value['id'],
        'password': value['password'],
        'sensors': value['sensors'] == null ? undefined : ((value['sensors'] as Array<any>).map(EntitySensorToJSON)),
        'settings': value['settings'] == null ? undefined : ((value['settings'] as Array<any>).map(EntityUserSettingToJSON)),
        'thermometers': value['thermometers'] == null ? undefined : ((value['thermometers'] as Array<any>).map(EntityThermometerToJSON)),
        'updated_at': value['updatedAt'],
        'username': value['username'],
    };
}
