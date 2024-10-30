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
exports.instanceOfSimulatorhandlerStartEngineResponse = instanceOfSimulatorhandlerStartEngineResponse;
exports.SimulatorhandlerStartEngineResponseFromJSON = SimulatorhandlerStartEngineResponseFromJSON;
exports.SimulatorhandlerStartEngineResponseFromJSONTyped = SimulatorhandlerStartEngineResponseFromJSONTyped;
exports.SimulatorhandlerStartEngineResponseToJSON = SimulatorhandlerStartEngineResponseToJSON;
exports.SimulatorhandlerStartEngineResponseToJSONTyped = SimulatorhandlerStartEngineResponseToJSONTyped;
/**
 * Check if a given object implements the SimulatorhandlerStartEngineResponse interface.
 */
function instanceOfSimulatorhandlerStartEngineResponse(value) {
    return true;
}
function SimulatorhandlerStartEngineResponseFromJSON(json) {
    return SimulatorhandlerStartEngineResponseFromJSONTyped(json, false);
}
function SimulatorhandlerStartEngineResponseFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'message': json['message'] == null ? undefined : json['message'],
        'status': json['status'] == null ? undefined : json['status'],
    };
}
function SimulatorhandlerStartEngineResponseToJSON(json) {
    return SimulatorhandlerStartEngineResponseToJSONTyped(json, false);
}
function SimulatorhandlerStartEngineResponseToJSONTyped(value, ignoreDiscriminator) {
    if (ignoreDiscriminator === void 0) { ignoreDiscriminator = false; }
    if (value == null) {
        return value;
    }
    return {
        'message': value['message'],
        'status': value['status'],
    };
}