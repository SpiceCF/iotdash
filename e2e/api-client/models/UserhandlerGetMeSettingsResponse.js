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
exports.instanceOfUserhandlerGetMeSettingsResponse = instanceOfUserhandlerGetMeSettingsResponse;
exports.UserhandlerGetMeSettingsResponseFromJSON = UserhandlerGetMeSettingsResponseFromJSON;
exports.UserhandlerGetMeSettingsResponseFromJSONTyped = UserhandlerGetMeSettingsResponseFromJSONTyped;
exports.UserhandlerGetMeSettingsResponseToJSON = UserhandlerGetMeSettingsResponseToJSON;
exports.UserhandlerGetMeSettingsResponseToJSONTyped = UserhandlerGetMeSettingsResponseToJSONTyped;
var DomainUserSetting_1 = require("./DomainUserSetting");
/**
 * Check if a given object implements the UserhandlerGetMeSettingsResponse interface.
 */
function instanceOfUserhandlerGetMeSettingsResponse(value) {
    return true;
}
function UserhandlerGetMeSettingsResponseFromJSON(json) {
    return UserhandlerGetMeSettingsResponseFromJSONTyped(json, false);
}
function UserhandlerGetMeSettingsResponseFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'data': json['data'] == null ? undefined : (json['data'].map(DomainUserSetting_1.DomainUserSettingFromJSON)),
        'status': json['status'] == null ? undefined : json['status'],
    };
}
function UserhandlerGetMeSettingsResponseToJSON(json) {
    return UserhandlerGetMeSettingsResponseToJSONTyped(json, false);
}
function UserhandlerGetMeSettingsResponseToJSONTyped(value, ignoreDiscriminator) {
    if (ignoreDiscriminator === void 0) { ignoreDiscriminator = false; }
    if (value == null) {
        return value;
    }
    return {
        'data': value['data'] == null ? undefined : (value['data'].map(DomainUserSetting_1.DomainUserSettingToJSON)),
        'status': value['status'],
    };
}
