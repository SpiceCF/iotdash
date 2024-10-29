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
import type { DomainThermometerConfig } from './DomainThermometerConfig';
import {
    DomainThermometerConfigFromJSON,
    DomainThermometerConfigFromJSONTyped,
    DomainThermometerConfigToJSON,
    DomainThermometerConfigToJSONTyped,
} from './DomainThermometerConfig';

/**
 * 
 * @export
 * @interface DomainThermometer
 */
export interface DomainThermometer {
    /**
     * 
     * @type {DomainThermometerConfig}
     * @memberof DomainThermometer
     */
    config?: DomainThermometerConfig;
    /**
     * 
     * @type {boolean}
     * @memberof DomainThermometer
     */
    connected?: boolean;
    /**
     * 
     * @type {object}
     * @memberof DomainThermometer
     */
    createdAt?: object;
    /**
     * 
     * @type {object}
     * @memberof DomainThermometer
     */
    id?: object;
    /**
     * 
     * @type {string}
     * @memberof DomainThermometer
     */
    ipAddress?: string;
    /**
     * 
     * @type {boolean}
     * @memberof DomainThermometer
     */
    isActive?: boolean;
    /**
     * 
     * @type {object}
     * @memberof DomainThermometer
     */
    ownerId?: object;
    /**
     * 
     * @type {number}
     * @memberof DomainThermometer
     */
    temperature?: number;
    /**
     * 
     * @type {object}
     * @memberof DomainThermometer
     */
    updatedAt?: object;
}

/**
 * Check if a given object implements the DomainThermometer interface.
 */
export function instanceOfDomainThermometer(value: object): value is DomainThermometer {
    return true;
}

export function DomainThermometerFromJSON(json: any): DomainThermometer {
    return DomainThermometerFromJSONTyped(json, false);
}

export function DomainThermometerFromJSONTyped(json: any, ignoreDiscriminator: boolean): DomainThermometer {
    if (json == null) {
        return json;
    }
    return {
        
        'config': json['config'] == null ? undefined : DomainThermometerConfigFromJSON(json['config']),
        'connected': json['connected'] == null ? undefined : json['connected'],
        'createdAt': json['created_at'] == null ? undefined : json['created_at'],
        'id': json['id'] == null ? undefined : json['id'],
        'ipAddress': json['ip_address'] == null ? undefined : json['ip_address'],
        'isActive': json['is_active'] == null ? undefined : json['is_active'],
        'ownerId': json['owner_id'] == null ? undefined : json['owner_id'],
        'temperature': json['temperature'] == null ? undefined : json['temperature'],
        'updatedAt': json['updated_at'] == null ? undefined : json['updated_at'],
    };
}

  export function DomainThermometerToJSON(json: any): DomainThermometer {
      return DomainThermometerToJSONTyped(json, false);
  }

  export function DomainThermometerToJSONTyped(value?: DomainThermometer | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'config': DomainThermometerConfigToJSON(value['config']),
        'connected': value['connected'],
        'created_at': value['createdAt'],
        'id': value['id'],
        'ip_address': value['ipAddress'],
        'is_active': value['isActive'],
        'owner_id': value['ownerId'],
        'temperature': value['temperature'],
        'updated_at': value['updatedAt'],
    };
}

