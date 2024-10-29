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
  SimulatorhandlerCreateThermometerRequest,
  SimulatorhandlerCreateThermometerResponse,
  SimulatorhandlerGetThermometerConfigResponse,
  SimulatorhandlerListThermometersResponse,
  SimulatorhandlerStartEngineResponse,
  SimulatorhandlerStopEngineResponse,
  SimulatorhandlerUpdateThermometerConfigRequest,
  SimulatorhandlerUpdateThermometerConfigResponse,
} from '../models/index';
import {
    SimulatorhandlerCreateThermometerRequestFromJSON,
    SimulatorhandlerCreateThermometerRequestToJSON,
    SimulatorhandlerCreateThermometerResponseFromJSON,
    SimulatorhandlerCreateThermometerResponseToJSON,
    SimulatorhandlerGetThermometerConfigResponseFromJSON,
    SimulatorhandlerGetThermometerConfigResponseToJSON,
    SimulatorhandlerListThermometersResponseFromJSON,
    SimulatorhandlerListThermometersResponseToJSON,
    SimulatorhandlerStartEngineResponseFromJSON,
    SimulatorhandlerStartEngineResponseToJSON,
    SimulatorhandlerStopEngineResponseFromJSON,
    SimulatorhandlerStopEngineResponseToJSON,
    SimulatorhandlerUpdateThermometerConfigRequestFromJSON,
    SimulatorhandlerUpdateThermometerConfigRequestToJSON,
    SimulatorhandlerUpdateThermometerConfigResponseFromJSON,
    SimulatorhandlerUpdateThermometerConfigResponseToJSON,
} from '../models/index';

export interface GetSimulatorThermometerIdConfigRequest {
    id: string;
}

export interface PostSimulatorThermometerRequest {
    body: SimulatorhandlerCreateThermometerRequest;
}

export interface PostSimulatorThermometerIdStartRequest {
    id: string;
}

export interface PostSimulatorThermometerIdStopRequest {
    id: string;
}

export interface PutSimulatorThermometerIdConfigRequest {
    id: string;
    body: SimulatorhandlerUpdateThermometerConfigRequest;
}

/**
 * 
 */
export class SimulatorThermometerApi extends runtime.BaseAPI {

    /**
     * List thermometers
     * List thermometers
     */
    async getSimulatorThermometerRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SimulatorhandlerListThermometersResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/simulator/thermometer`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SimulatorhandlerListThermometersResponseFromJSON(jsonValue));
    }

    /**
     * List thermometers
     * List thermometers
     */
    async getSimulatorThermometer(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SimulatorhandlerListThermometersResponse> {
        const response = await this.getSimulatorThermometerRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get thermometer config
     * Get thermometer config
     */
    async getSimulatorThermometerIdConfigRaw(requestParameters: GetSimulatorThermometerIdConfigRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SimulatorhandlerGetThermometerConfigResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getSimulatorThermometerIdConfig().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/simulator/thermometer/{id}/config`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SimulatorhandlerGetThermometerConfigResponseFromJSON(jsonValue));
    }

    /**
     * Get thermometer config
     * Get thermometer config
     */
    async getSimulatorThermometerIdConfig(requestParameters: GetSimulatorThermometerIdConfigRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SimulatorhandlerGetThermometerConfigResponse> {
        const response = await this.getSimulatorThermometerIdConfigRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create thermometer
     * Create thermometer
     */
    async postSimulatorThermometerRaw(requestParameters: PostSimulatorThermometerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SimulatorhandlerCreateThermometerResponse>> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling postSimulatorThermometer().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/simulator/thermometer`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SimulatorhandlerCreateThermometerRequestToJSON(requestParameters['body']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SimulatorhandlerCreateThermometerResponseFromJSON(jsonValue));
    }

    /**
     * Create thermometer
     * Create thermometer
     */
    async postSimulatorThermometer(requestParameters: PostSimulatorThermometerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SimulatorhandlerCreateThermometerResponse> {
        const response = await this.postSimulatorThermometerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Start thermometer engine
     * Start thermometer engine
     */
    async postSimulatorThermometerIdStartRaw(requestParameters: PostSimulatorThermometerIdStartRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SimulatorhandlerStartEngineResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling postSimulatorThermometerIdStart().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/simulator/thermometer/{id}/start`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SimulatorhandlerStartEngineResponseFromJSON(jsonValue));
    }

    /**
     * Start thermometer engine
     * Start thermometer engine
     */
    async postSimulatorThermometerIdStart(requestParameters: PostSimulatorThermometerIdStartRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SimulatorhandlerStartEngineResponse> {
        const response = await this.postSimulatorThermometerIdStartRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Stop thermometer engine
     * Stop thermometer engine
     */
    async postSimulatorThermometerIdStopRaw(requestParameters: PostSimulatorThermometerIdStopRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SimulatorhandlerStopEngineResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling postSimulatorThermometerIdStop().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/simulator/thermometer/{id}/stop`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SimulatorhandlerStopEngineResponseFromJSON(jsonValue));
    }

    /**
     * Stop thermometer engine
     * Stop thermometer engine
     */
    async postSimulatorThermometerIdStop(requestParameters: PostSimulatorThermometerIdStopRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SimulatorhandlerStopEngineResponse> {
        const response = await this.postSimulatorThermometerIdStopRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update thermometer config
     * Update thermometer config
     */
    async putSimulatorThermometerIdConfigRaw(requestParameters: PutSimulatorThermometerIdConfigRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SimulatorhandlerUpdateThermometerConfigResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling putSimulatorThermometerIdConfig().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling putSimulatorThermometerIdConfig().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/simulator/thermometer/{id}/config`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: SimulatorhandlerUpdateThermometerConfigRequestToJSON(requestParameters['body']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SimulatorhandlerUpdateThermometerConfigResponseFromJSON(jsonValue));
    }

    /**
     * Update thermometer config
     * Update thermometer config
     */
    async putSimulatorThermometerIdConfig(requestParameters: PutSimulatorThermometerIdConfigRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SimulatorhandlerUpdateThermometerConfigResponse> {
        const response = await this.putSimulatorThermometerIdConfigRaw(requestParameters, initOverrides);
        return await response.value();
    }

}