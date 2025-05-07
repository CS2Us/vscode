/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// 基础位置接口
export interface Location {
	name: string;
	lat?: number;
	lng?: number;
}

// POI接口
export interface POI {
	name: string;
	lat: number;
	lng: number;
	type?: string;
	distance?: number;
}
