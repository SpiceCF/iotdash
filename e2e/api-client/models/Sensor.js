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
exports.SensorTypeEnum = void 0;
exports.instanceOfSensor = instanceOfSensor;
exports.SensorFromJSON = SensorFromJSON;
exports.SensorFromJSONTyped = SensorFromJSONTyped;
exports.SensorToJSON = SensorToJSON;
exports.SensorToJSONTyped = SensorToJSONTyped;
var SensorConfig_1 = require("./SensorConfig");
/**
 * @export
 */
exports.SensorTypeEnum = {
    Thermometer: 'thermometer'
};
/**
 * Check if a given object implements the Sensor interface.
 */
function instanceOfSensor(value) {
    return true;
}
function SensorFromJSON(json) {
    return SensorFromJSONTyped(json, false);
}
function SensorFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'id': json['id'] == null ? undefined : json['id'],
        'deviceId': json['device_id'] == null ? undefined : json['device_id'],
        'name': json['name'] == null ? undefined : json['name'],
        'type': json['type'] == null ? undefined : json['type'],
        'configs': json['configs'] == null ? undefined : (json['configs'].map(SensorConfig_1.SensorConfigFromJSON)),
        'createdAt': json['created_at'] == null ? undefined : (new Date(json['created_at'])),
        'updatedAt': json['updated_at'] == null ? undefined : (new Date(json['updated_at'])),
    };
}
function SensorToJSON(json) {
    return SensorToJSONTyped(json, false);
}
function SensorToJSONTyped(value, ignoreDiscriminator) {
    if (ignoreDiscriminator === void 0) { ignoreDiscriminator = false; }
    if (value == null) {
        return value;
    }
    return {
        'name': value['name'],
        'type': value['type'],
    };
}
