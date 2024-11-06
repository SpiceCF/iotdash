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
  SensorCreateSensorRequest,
  SensorCreateSensorResponse,
  SensorCreateThermometerLogRequest,
  SensorCreateThermometerLogResponse,
  SensorListSensorLogsResponse,
  SensorListSensorMetricLogsResponse,
  SensorListSensorsResponse,
} from '../models/index';
import {
    SensorCreateSensorRequestFromJSON,
    SensorCreateSensorRequestToJSON,
    SensorCreateSensorResponseFromJSON,
    SensorCreateSensorResponseToJSON,
    SensorCreateThermometerLogRequestFromJSON,
    SensorCreateThermometerLogRequestToJSON,
    SensorCreateThermometerLogResponseFromJSON,
    SensorCreateThermometerLogResponseToJSON,
    SensorListSensorLogsResponseFromJSON,
    SensorListSensorLogsResponseToJSON,
    SensorListSensorMetricLogsResponseFromJSON,
    SensorListSensorMetricLogsResponseToJSON,
    SensorListSensorsResponseFromJSON,
    SensorListSensorsResponseToJSON,
} from '../models/index';

export interface GetSensorsIdLogsRequest {
    id: string;
}

export interface GetSensorsIdLogsMetricRequest {
    id: string;
    key: string;
    from: string;
    to: string;
    interval: string;
}

export interface PostSensorsRequest {
    body: SensorCreateSensorRequest;
}

export interface PostSensorsThermometerLogsRequest {
    body: SensorCreateThermometerLogRequest;
}

/**
 * 
 */
export class SensorApi extends runtime.BaseAPI {

    /**
     * List sensors
     * List sensors
     */
    async getSensorsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SensorListSensorsResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/sensors`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SensorListSensorsResponseFromJSON(jsonValue));
    }

    /**
     * List sensors
     * List sensors
     */
    async getSensors(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SensorListSensorsResponse> {
        const response = await this.getSensorsRaw(initOverrides);
        return await response.value();
    }

    /**
     * List sensor logs
     * List sensor logs
     */
    async getSensorsIdLogsRaw(requestParameters: GetSensorsIdLogsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SensorListSensorLogsResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getSensorsIdLogs().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/sensors/{id}/logs`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SensorListSensorLogsResponseFromJSON(jsonValue));
    }

    /**
     * List sensor logs
     * List sensor logs
     */
    async getSensorsIdLogs(requestParameters: GetSensorsIdLogsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SensorListSensorLogsResponse> {
        const response = await this.getSensorsIdLogsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List sensor metric logs
     * List sensor metric logs
     */
    async getSensorsIdLogsMetricRaw(requestParameters: GetSensorsIdLogsMetricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SensorListSensorMetricLogsResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getSensorsIdLogsMetric().'
            );
        }

        if (requestParameters['key'] == null) {
            throw new runtime.RequiredError(
                'key',
                'Required parameter "key" was null or undefined when calling getSensorsIdLogsMetric().'
            );
        }

        if (requestParameters['from'] == null) {
            throw new runtime.RequiredError(
                'from',
                'Required parameter "from" was null or undefined when calling getSensorsIdLogsMetric().'
            );
        }

        if (requestParameters['to'] == null) {
            throw new runtime.RequiredError(
                'to',
                'Required parameter "to" was null or undefined when calling getSensorsIdLogsMetric().'
            );
        }

        if (requestParameters['interval'] == null) {
            throw new runtime.RequiredError(
                'interval',
                'Required parameter "interval" was null or undefined when calling getSensorsIdLogsMetric().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['key'] != null) {
            queryParameters['key'] = requestParameters['key'];
        }

        if (requestParameters['from'] != null) {
            queryParameters['from'] = requestParameters['from'];
        }

        if (requestParameters['to'] != null) {
            queryParameters['to'] = requestParameters['to'];
        }

        if (requestParameters['interval'] != null) {
            queryParameters['interval'] = requestParameters['interval'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/sensors/{id}/logs/metric`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SensorListSensorMetricLogsResponseFromJSON(jsonValue));
    }

    /**
     * List sensor metric logs
     * List sensor metric logs
     */
    async getSensorsIdLogsMetric(requestParameters: GetSensorsIdLogsMetricRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SensorListSensorMetricLogsResponse> {
        const response = await this.getSensorsIdLogsMetricRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create sensor
     * Create sensor
     */
    async postSensorsRaw(requestParameters: PostSensorsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SensorCreateSensorResponse>> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling postSensors().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/sensors`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SensorCreateSensorRequestToJSON(requestParameters['body']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SensorCreateSensorResponseFromJSON(jsonValue));
    }

    /**
     * Create sensor
     * Create sensor
     */
    async postSensors(requestParameters: PostSensorsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SensorCreateSensorResponse> {
        const response = await this.postSensorsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create thermometer log
     * Create thermometer log
     */
    async postSensorsThermometerLogsRaw(requestParameters: PostSensorsThermometerLogsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SensorCreateThermometerLogResponse>> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling postSensorsThermometerLogs().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // BearerAuth authentication
        }

        const response = await this.request({
            path: `/sensors/thermometer/logs`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SensorCreateThermometerLogRequestToJSON(requestParameters['body']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SensorCreateThermometerLogResponseFromJSON(jsonValue));
    }

    /**
     * Create thermometer log
     * Create thermometer log
     */
    async postSensorsThermometerLogs(requestParameters: PostSensorsThermometerLogsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SensorCreateThermometerLogResponse> {
        const response = await this.postSensorsThermometerLogsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}