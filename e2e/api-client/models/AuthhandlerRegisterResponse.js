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
exports.instanceOfAuthhandlerRegisterResponse = instanceOfAuthhandlerRegisterResponse;
exports.AuthhandlerRegisterResponseFromJSON = AuthhandlerRegisterResponseFromJSON;
exports.AuthhandlerRegisterResponseFromJSONTyped = AuthhandlerRegisterResponseFromJSONTyped;
exports.AuthhandlerRegisterResponseToJSON = AuthhandlerRegisterResponseToJSON;
exports.AuthhandlerRegisterResponseToJSONTyped = AuthhandlerRegisterResponseToJSONTyped;
var AuthhandlerRegisterErrorResponseData_1 = require("./AuthhandlerRegisterErrorResponseData");
/**
 * Check if a given object implements the AuthhandlerRegisterResponse interface.
 */
function instanceOfAuthhandlerRegisterResponse(value) {
    return true;
}
function AuthhandlerRegisterResponseFromJSON(json) {
    return AuthhandlerRegisterResponseFromJSONTyped(json, false);
}
function AuthhandlerRegisterResponseFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'data': json['data'] == null ? undefined : (0, AuthhandlerRegisterErrorResponseData_1.AuthhandlerRegisterErrorResponseDataFromJSON)(json['data']),
        'status': json['status'] == null ? undefined : json['status'],
    };
}
function AuthhandlerRegisterResponseToJSON(json) {
    return AuthhandlerRegisterResponseToJSONTyped(json, false);
}
function AuthhandlerRegisterResponseToJSONTyped(value, ignoreDiscriminator) {
    if (ignoreDiscriminator === void 0) { ignoreDiscriminator = false; }
    if (value == null) {
        return value;
    }
    return {
        'data': (0, AuthhandlerRegisterErrorResponseData_1.AuthhandlerRegisterErrorResponseDataToJSON)(value['data']),
        'status': value['status'],
    };
}
