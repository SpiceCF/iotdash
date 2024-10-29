"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfUser = instanceOfUser;
exports.UserFromJSON = UserFromJSON;
exports.UserFromJSONTyped = UserFromJSONTyped;
exports.UserToJSON = UserToJSON;
exports.UserToJSONTyped = UserToJSONTyped;
var Thermometer_1 = require("./Thermometer");
var Sensor_1 = require("./Sensor");
var UserSetting_1 = require("./UserSetting");
/**
 * Check if a given object implements the User interface.
 */
function instanceOfUser(value) {
    return true;
}
function UserFromJSON(json) {
    return UserFromJSONTyped(json, false);
}
function UserFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'id': json['id'] == null ? undefined : json['id'],
        'fullName': json['full_name'] == null ? undefined : json['full_name'],
        'email': json['email'] == null ? undefined : json['email'],
        'username': json['username'] == null ? undefined : json['username'],
        'password': json['password'] == null ? undefined : json['password'],
        'settings': json['settings'] == null ? undefined : (json['settings'].map(UserSetting_1.UserSettingFromJSON)),
        'sensors': json['sensors'] == null ? undefined : (json['sensors'].map(Sensor_1.SensorFromJSON)),
        'thermometers': json['thermometers'] == null ? undefined : (json['thermometers'].map(Thermometer_1.ThermometerFromJSON)),
        'createdAt': json['created_at'] == null ? undefined : (new Date(json['created_at'])),
        'updatedAt': json['updated_at'] == null ? undefined : (new Date(json['updated_at'])),
    };
}
function UserToJSON(json) {
    return UserToJSONTyped(json, false);
}
function UserToJSONTyped(value, ignoreDiscriminator) {
    if (ignoreDiscriminator === void 0) { ignoreDiscriminator = false; }
    if (value == null) {
        return value;
    }
    return {
        'full_name': value['fullName'],
        'email': value['email'],
        'username': value['username'],
        'password': value['password'],
    };
}
