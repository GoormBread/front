/* tslint:disable */
/* eslint-disable */
/**
 * goormbread api
 * 구름빵 API입니다.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  PatchUserPadInformationDto,
} from '../models/index';
import {
    PatchUserPadInformationDtoFromJSON,
    PatchUserPadInformationDtoToJSON,
} from '../models/index';

export interface UserControllerGetUserPadInformationRequest {
    userId: string;
}

export interface UserControllerPatchUserPadInformationRequest {
    userId: string;
    patchUserPadInformationDto: PatchUserPadInformationDto;
}

/**
 * 
 */
export class UserApi extends runtime.BaseAPI {

    /**
     */
    async userControllerGetUserPadInformationRaw(requestParameters: UserControllerGetUserPadInformationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling userControllerGetUserPadInformation().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/{userId}/pad`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters['userId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async userControllerGetUserPadInformation(requestParameters: UserControllerGetUserPadInformationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.userControllerGetUserPadInformationRaw(requestParameters, initOverrides);
    }

    /**
     */
    async userControllerPatchUserPadInformationRaw(requestParameters: UserControllerPatchUserPadInformationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling userControllerPatchUserPadInformation().'
            );
        }

        if (requestParameters['patchUserPadInformationDto'] == null) {
            throw new runtime.RequiredError(
                'patchUserPadInformationDto',
                'Required parameter "patchUserPadInformationDto" was null or undefined when calling userControllerPatchUserPadInformation().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user/{userId}/pad`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters['userId']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PatchUserPadInformationDtoToJSON(requestParameters['patchUserPadInformationDto']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async userControllerPatchUserPadInformation(requestParameters: UserControllerPatchUserPadInformationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.userControllerPatchUserPadInformationRaw(requestParameters, initOverrides);
    }

}
