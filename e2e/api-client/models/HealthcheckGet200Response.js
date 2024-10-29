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
exports.instanceOfHealthcheckGet200Response = instanceOfHealthcheckGet200Response;
exports.HealthcheckGet200ResponseFromJSON = HealthcheckGet200ResponseFromJSON;
exports.HealthcheckGet200ResponseFromJSONTyped = HealthcheckGet200ResponseFromJSONTyped;
exports.HealthcheckGet200ResponseToJSON = HealthcheckGet200ResponseToJSON;
exports.HealthcheckGet200ResponseToJSONTyped = HealthcheckGet200ResponseToJSONTyped;
/**
 * Check if a given object implements the HealthcheckGet200Response interface.
 */
function instanceOfHealthcheckGet200Response(value) {
    return true;
}
function HealthcheckGet200ResponseFromJSON(json) {
    return HealthcheckGet200ResponseFromJSONTyped(json, false);
}
function HealthcheckGet200ResponseFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'status': json['status'] == null ? undefined : json['status'],
    };
}
function HealthcheckGet200ResponseToJSON(json) {
    return HealthcheckGet200ResponseToJSONTyped(json, false);
}
function HealthcheckGet200ResponseToJSONTyped(value, ignoreDiscriminator) {
    if (ignoreDiscriminator === void 0) { ignoreDiscriminator = false; }
    if (value == null) {
        return value;
    }
    return {
        'status': value['status'],
    };
}
