"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfDomainUser = instanceOfDomainUser;
exports.DomainUserFromJSON = DomainUserFromJSON;
exports.DomainUserFromJSONTyped = DomainUserFromJSONTyped;
exports.DomainUserToJSON = DomainUserToJSON;
exports.DomainUserToJSONTyped = DomainUserToJSONTyped;
var DomainUserSetting_1 = require("./DomainUserSetting");
var DomainSensor_1 = require("./DomainSensor");
var DomainThermometer_1 = require("./DomainThermometer");
/**
 * Check if a given object implements the DomainUser interface.
 */
function instanceOfDomainUser(value) {
    return true;
}
function DomainUserFromJSON(json) {
    return DomainUserFromJSONTyped(json, false);
}
function DomainUserFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'createdAt': json['created_at'] == null ? undefined : json['created_at'],
        'email': json['email'] == null ? undefined : json['email'],
        'fullName': json['full_name'] == null ? undefined : json['full_name'],
        'id': json['id'] == null ? undefined : json['id'],
        'password': json['password'] == null ? undefined : json['password'],
        'sensors': json['sensors'] == null ? undefined : (json['sensors'].map(DomainSensor_1.DomainSensorFromJSON)),
        'settings': json['settings'] == null ? undefined : (json['settings'].map(DomainUserSetting_1.DomainUserSettingFromJSON)),
        'thermometers': json['thermometers'] == null ? undefined : (json['thermometers'].map(DomainThermometer_1.DomainThermometerFromJSON)),
        'updatedAt': json['updated_at'] == null ? undefined : json['updated_at'],
        'username': json['username'] == null ? undefined : json['username'],
    };
}
function DomainUserToJSON(json) {
    return DomainUserToJSONTyped(json, false);
}
function DomainUserToJSONTyped(value, ignoreDiscriminator) {
    if (ignoreDiscriminator === void 0) { ignoreDiscriminator = false; }
    if (value == null) {
        return value;
    }
    return {
        'created_at': value['createdAt'],
        'email': value['email'],
        'full_name': value['fullName'],
        'id': value['id'],
        'password': value['password'],
        'sensors': value['sensors'] == null ? undefined : (value['sensors'].map(DomainSensor_1.DomainSensorToJSON)),
        'settings': value['settings'] == null ? undefined : (value['settings'].map(DomainUserSetting_1.DomainUserSettingToJSON)),
        'thermometers': value['thermometers'] == null ? undefined : (value['thermometers'].map(DomainThermometer_1.DomainThermometerToJSON)),
        'updated_at': value['updatedAt'],
        'username': value['username'],
    };
}
