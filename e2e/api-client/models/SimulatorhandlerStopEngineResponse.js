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
exports.instanceOfSimulatorhandlerStopEngineResponse = instanceOfSimulatorhandlerStopEngineResponse;
exports.SimulatorhandlerStopEngineResponseFromJSON = SimulatorhandlerStopEngineResponseFromJSON;
exports.SimulatorhandlerStopEngineResponseFromJSONTyped = SimulatorhandlerStopEngineResponseFromJSONTyped;
exports.SimulatorhandlerStopEngineResponseToJSON = SimulatorhandlerStopEngineResponseToJSON;
exports.SimulatorhandlerStopEngineResponseToJSONTyped = SimulatorhandlerStopEngineResponseToJSONTyped;
/**
 * Check if a given object implements the SimulatorhandlerStopEngineResponse interface.
 */
function instanceOfSimulatorhandlerStopEngineResponse(value) {
    return true;
}
function SimulatorhandlerStopEngineResponseFromJSON(json) {
    return SimulatorhandlerStopEngineResponseFromJSONTyped(json, false);
}
function SimulatorhandlerStopEngineResponseFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'message': json['message'] == null ? undefined : json['message'],
        'status': json['status'] == null ? undefined : json['status'],
    };
}
function SimulatorhandlerStopEngineResponseToJSON(json) {
    return SimulatorhandlerStopEngineResponseToJSONTyped(json, false);
}
function SimulatorhandlerStopEngineResponseToJSONTyped(value, ignoreDiscriminator) {
    if (ignoreDiscriminator === void 0) { ignoreDiscriminator = false; }
    if (value == null) {
        return value;
    }
    return {
        'message': value['message'],
        'status': value['status'],
    };
}