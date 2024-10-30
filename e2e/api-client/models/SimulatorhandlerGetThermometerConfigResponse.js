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
exports.instanceOfSimulatorhandlerGetThermometerConfigResponse = instanceOfSimulatorhandlerGetThermometerConfigResponse;
exports.SimulatorhandlerGetThermometerConfigResponseFromJSON = SimulatorhandlerGetThermometerConfigResponseFromJSON;
exports.SimulatorhandlerGetThermometerConfigResponseFromJSONTyped = SimulatorhandlerGetThermometerConfigResponseFromJSONTyped;
exports.SimulatorhandlerGetThermometerConfigResponseToJSON = SimulatorhandlerGetThermometerConfigResponseToJSON;
exports.SimulatorhandlerGetThermometerConfigResponseToJSONTyped = SimulatorhandlerGetThermometerConfigResponseToJSONTyped;
var DomainThermometerConfig_1 = require("./DomainThermometerConfig");
/**
 * Check if a given object implements the SimulatorhandlerGetThermometerConfigResponse interface.
 */
function instanceOfSimulatorhandlerGetThermometerConfigResponse(value) {
    return true;
}
function SimulatorhandlerGetThermometerConfigResponseFromJSON(json) {
    return SimulatorhandlerGetThermometerConfigResponseFromJSONTyped(json, false);
}
function SimulatorhandlerGetThermometerConfigResponseFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'data': json['data'] == null ? undefined : (0, DomainThermometerConfig_1.DomainThermometerConfigFromJSON)(json['data']),
        'status': json['status'] == null ? undefined : json['status'],
    };
}
function SimulatorhandlerGetThermometerConfigResponseToJSON(json) {
    return SimulatorhandlerGetThermometerConfigResponseToJSONTyped(json, false);
}
function SimulatorhandlerGetThermometerConfigResponseToJSONTyped(value, ignoreDiscriminator) {
    if (ignoreDiscriminator === void 0) { ignoreDiscriminator = false; }
    if (value == null) {
        return value;
    }
    return {
        'data': (0, DomainThermometerConfig_1.DomainThermometerConfigToJSON)(value['data']),
        'status': value['status'],
    };
}