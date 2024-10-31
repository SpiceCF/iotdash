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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorThermometerApi = void 0;
var runtime = require("../runtime");
var index_1 = require("../models/index");
/**
 *
 */
var SimulatorThermometerApi = /** @class */ (function (_super) {
    __extends(SimulatorThermometerApi, _super);
    function SimulatorThermometerApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * List thermometers
     * List thermometers
     */
    SimulatorThermometerApi.prototype.getSimulatorThermometerRaw = function (initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, _a, _b, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        queryParameters = {};
                        headerParameters = {};
                        if (!(this.configuration && this.configuration.apiKey)) return [3 /*break*/, 2];
                        _a = headerParameters;
                        _b = "Authorization";
                        return [4 /*yield*/, this.configuration.apiKey("Authorization")];
                    case 1:
                        _a[_b] = _c.sent(); // BearerAuth authentication
                        _c.label = 2;
                    case 2: return [4 /*yield*/, this.request({
                            path: "/simulator/thermometer",
                            method: 'GET',
                            headers: headerParameters,
                            query: queryParameters,
                        }, initOverrides)];
                    case 3:
                        response = _c.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.SimulatorhandlerListThermometersResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * List thermometers
     * List thermometers
     */
    SimulatorThermometerApi.prototype.getSimulatorThermometer = function (initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSimulatorThermometerRaw(initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get thermometer
     * Get thermometer
     */
    SimulatorThermometerApi.prototype.getSimulatorThermometerIdRaw = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, _a, _b, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (requestParameters['id'] == null) {
                            throw new runtime.RequiredError('id', 'Required parameter "id" was null or undefined when calling getSimulatorThermometerId().');
                        }
                        queryParameters = {};
                        headerParameters = {};
                        if (!(this.configuration && this.configuration.apiKey)) return [3 /*break*/, 2];
                        _a = headerParameters;
                        _b = "Authorization";
                        return [4 /*yield*/, this.configuration.apiKey("Authorization")];
                    case 1:
                        _a[_b] = _c.sent(); // BearerAuth authentication
                        _c.label = 2;
                    case 2: return [4 /*yield*/, this.request({
                            path: "/simulator/thermometer/{id}".replace("{".concat("id", "}"), encodeURIComponent(String(requestParameters['id']))),
                            method: 'GET',
                            headers: headerParameters,
                            query: queryParameters,
                        }, initOverrides)];
                    case 3:
                        response = _c.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.SimulatorhandlerGetThermometerResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * Get thermometer
     * Get thermometer
     */
    SimulatorThermometerApi.prototype.getSimulatorThermometerId = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSimulatorThermometerIdRaw(requestParameters, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get thermometer history
     * Get thermometer history
     */
    SimulatorThermometerApi.prototype.getSimulatorThermometerIdHistoryRaw = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, _a, _b, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (requestParameters['id'] == null) {
                            throw new runtime.RequiredError('id', 'Required parameter "id" was null or undefined when calling getSimulatorThermometerIdHistory().');
                        }
                        queryParameters = {};
                        headerParameters = {};
                        if (!(this.configuration && this.configuration.apiKey)) return [3 /*break*/, 2];
                        _a = headerParameters;
                        _b = "Authorization";
                        return [4 /*yield*/, this.configuration.apiKey("Authorization")];
                    case 1:
                        _a[_b] = _c.sent(); // BearerAuth authentication
                        _c.label = 2;
                    case 2: return [4 /*yield*/, this.request({
                            path: "/simulator/thermometer/{id}/history".replace("{".concat("id", "}"), encodeURIComponent(String(requestParameters['id']))),
                            method: 'GET',
                            headers: headerParameters,
                            query: queryParameters,
                        }, initOverrides)];
                    case 3:
                        response = _c.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.SimulatorhandlerGetTMHistoryResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * Get thermometer history
     * Get thermometer history
     */
    SimulatorThermometerApi.prototype.getSimulatorThermometerIdHistory = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSimulatorThermometerIdHistoryRaw(requestParameters, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create thermometer
     * Create thermometer
     */
    SimulatorThermometerApi.prototype.postSimulatorThermometerRaw = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, _a, _b, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (requestParameters['body'] == null) {
                            throw new runtime.RequiredError('body', 'Required parameter "body" was null or undefined when calling postSimulatorThermometer().');
                        }
                        queryParameters = {};
                        headerParameters = {};
                        headerParameters['Content-Type'] = 'application/json';
                        if (!(this.configuration && this.configuration.apiKey)) return [3 /*break*/, 2];
                        _a = headerParameters;
                        _b = "Authorization";
                        return [4 /*yield*/, this.configuration.apiKey("Authorization")];
                    case 1:
                        _a[_b] = _c.sent(); // BearerAuth authentication
                        _c.label = 2;
                    case 2: return [4 /*yield*/, this.request({
                            path: "/simulator/thermometer",
                            method: 'POST',
                            headers: headerParameters,
                            query: queryParameters,
                            body: (0, index_1.SimulatorhandlerCreateThermometerRequestToJSON)(requestParameters['body']),
                        }, initOverrides)];
                    case 3:
                        response = _c.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.SimulatorhandlerCreateThermometerResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * Create thermometer
     * Create thermometer
     */
    SimulatorThermometerApi.prototype.postSimulatorThermometer = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postSimulatorThermometerRaw(requestParameters, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Start thermometer engine
     * Start thermometer engine
     */
    SimulatorThermometerApi.prototype.postSimulatorThermometerIdStartRaw = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, _a, _b, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (requestParameters['id'] == null) {
                            throw new runtime.RequiredError('id', 'Required parameter "id" was null or undefined when calling postSimulatorThermometerIdStart().');
                        }
                        queryParameters = {};
                        headerParameters = {};
                        if (!(this.configuration && this.configuration.apiKey)) return [3 /*break*/, 2];
                        _a = headerParameters;
                        _b = "Authorization";
                        return [4 /*yield*/, this.configuration.apiKey("Authorization")];
                    case 1:
                        _a[_b] = _c.sent(); // BearerAuth authentication
                        _c.label = 2;
                    case 2: return [4 /*yield*/, this.request({
                            path: "/simulator/thermometer/{id}/start".replace("{".concat("id", "}"), encodeURIComponent(String(requestParameters['id']))),
                            method: 'POST',
                            headers: headerParameters,
                            query: queryParameters,
                        }, initOverrides)];
                    case 3:
                        response = _c.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.SimulatorhandlerEngineSwitchResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * Start thermometer engine
     * Start thermometer engine
     */
    SimulatorThermometerApi.prototype.postSimulatorThermometerIdStart = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postSimulatorThermometerIdStartRaw(requestParameters, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Stop thermometer engine
     * Stop thermometer engine
     */
    SimulatorThermometerApi.prototype.postSimulatorThermometerIdStopRaw = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, _a, _b, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (requestParameters['id'] == null) {
                            throw new runtime.RequiredError('id', 'Required parameter "id" was null or undefined when calling postSimulatorThermometerIdStop().');
                        }
                        queryParameters = {};
                        headerParameters = {};
                        if (!(this.configuration && this.configuration.apiKey)) return [3 /*break*/, 2];
                        _a = headerParameters;
                        _b = "Authorization";
                        return [4 /*yield*/, this.configuration.apiKey("Authorization")];
                    case 1:
                        _a[_b] = _c.sent(); // BearerAuth authentication
                        _c.label = 2;
                    case 2: return [4 /*yield*/, this.request({
                            path: "/simulator/thermometer/{id}/stop".replace("{".concat("id", "}"), encodeURIComponent(String(requestParameters['id']))),
                            method: 'POST',
                            headers: headerParameters,
                            query: queryParameters,
                        }, initOverrides)];
                    case 3:
                        response = _c.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.SimulatorhandlerEngineSwitchResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * Stop thermometer engine
     * Stop thermometer engine
     */
    SimulatorThermometerApi.prototype.postSimulatorThermometerIdStop = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postSimulatorThermometerIdStopRaw(requestParameters, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update thermometer config
     * Update thermometer config
     */
    SimulatorThermometerApi.prototype.putSimulatorThermometerIdConfigRaw = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParameters, headerParameters, _a, _b, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (requestParameters['id'] == null) {
                            throw new runtime.RequiredError('id', 'Required parameter "id" was null or undefined when calling putSimulatorThermometerIdConfig().');
                        }
                        if (requestParameters['body'] == null) {
                            throw new runtime.RequiredError('body', 'Required parameter "body" was null or undefined when calling putSimulatorThermometerIdConfig().');
                        }
                        queryParameters = {};
                        headerParameters = {};
                        headerParameters['Content-Type'] = 'application/json';
                        if (!(this.configuration && this.configuration.apiKey)) return [3 /*break*/, 2];
                        _a = headerParameters;
                        _b = "Authorization";
                        return [4 /*yield*/, this.configuration.apiKey("Authorization")];
                    case 1:
                        _a[_b] = _c.sent(); // BearerAuth authentication
                        _c.label = 2;
                    case 2: return [4 /*yield*/, this.request({
                            path: "/simulator/thermometer/{id}/config".replace("{".concat("id", "}"), encodeURIComponent(String(requestParameters['id']))),
                            method: 'PUT',
                            headers: headerParameters,
                            query: queryParameters,
                            body: (0, index_1.SimulatorhandlerUpdateThermometerConfigRequestToJSON)(requestParameters['body']),
                        }, initOverrides)];
                    case 3:
                        response = _c.sent();
                        return [2 /*return*/, new runtime.JSONApiResponse(response, function (jsonValue) { return (0, index_1.SimulatorhandlerUpdateThermometerConfigResponseFromJSON)(jsonValue); })];
                }
            });
        });
    };
    /**
     * Update thermometer config
     * Update thermometer config
     */
    SimulatorThermometerApi.prototype.putSimulatorThermometerIdConfig = function (requestParameters, initOverrides) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.putSimulatorThermometerIdConfigRaw(requestParameters, initOverrides)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.value()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SimulatorThermometerApi;
}(runtime.BaseAPI));
exports.SimulatorThermometerApi = SimulatorThermometerApi;
