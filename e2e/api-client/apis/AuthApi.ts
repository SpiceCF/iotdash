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
  AuthhandlerLoginRequest,
  AuthhandlerLoginResponse,
  AuthhandlerRegisterRequest,
  AuthhandlerRegisterResponse,
} from '../models/index';
import {
    AuthhandlerLoginRequestFromJSON,
    AuthhandlerLoginRequestToJSON,
    AuthhandlerLoginResponseFromJSON,
    AuthhandlerLoginResponseToJSON,
    AuthhandlerRegisterRequestFromJSON,
    AuthhandlerRegisterRequestToJSON,
    AuthhandlerRegisterResponseFromJSON,
    AuthhandlerRegisterResponseToJSON,
} from '../models/index';

export interface PostAuthLoginRequest {
    body: AuthhandlerLoginRequest;
}

export interface PostAuthRegisterRequest {
    body: AuthhandlerRegisterRequest;
}

/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     * Login to the system
     * Login
     */
    async postAuthLoginRaw(requestParameters: PostAuthLoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AuthhandlerLoginResponse>> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling postAuthLogin().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/auth/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AuthhandlerLoginRequestToJSON(requestParameters['body']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AuthhandlerLoginResponseFromJSON(jsonValue));
    }

    /**
     * Login to the system
     * Login
     */
    async postAuthLogin(requestParameters: PostAuthLoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AuthhandlerLoginResponse> {
        const response = await this.postAuthLoginRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Register to the system
     * Register
     */
    async postAuthRegisterRaw(requestParameters: PostAuthRegisterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AuthhandlerRegisterResponse>> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling postAuthRegister().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/auth/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AuthhandlerRegisterRequestToJSON(requestParameters['body']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AuthhandlerRegisterResponseFromJSON(jsonValue));
    }

    /**
     * Register to the system
     * Register
     */
    async postAuthRegister(requestParameters: PostAuthRegisterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AuthhandlerRegisterResponse> {
        const response = await this.postAuthRegisterRaw(requestParameters, initOverrides);
        return await response.value();
    }

}