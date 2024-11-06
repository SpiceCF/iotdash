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


import * as runtime from '../runtime';
import type {
  UserGetMeResponse,
  UserGetMeSettingsResponse,
} from '../models/index';
import {
    UserGetMeResponseFromJSON,
    UserGetMeResponseToJSON,
    UserGetMeSettingsResponseFromJSON,
    UserGetMeSettingsResponseToJSON,
} from '../models/index';

/**
 * 
 */
export class UserApi extends runtime.BaseAPI {

    /**
     * Get current user profile
     * Get current user
     */
    async getUsersMeRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserGetMeResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/users/me`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserGetMeResponseFromJSON(jsonValue));
    }

    /**
     * Get current user profile
     * Get current user
     */
    async getUsersMe(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserGetMeResponse> {
        const response = await this.getUsersMeRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get current user settings
     * Get current user settings
     */
    async getUsersMeSettingsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserGetMeSettingsResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/users/me/settings`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserGetMeSettingsResponseFromJSON(jsonValue));
    }

    /**
     * Get current user settings
     * Get current user settings
     */
    async getUsersMeSettings(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserGetMeSettingsResponse> {
        const response = await this.getUsersMeSettingsRaw(initOverrides);
        return await response.value();
    }

}