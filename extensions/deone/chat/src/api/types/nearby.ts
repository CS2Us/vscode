/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Location, POI } from './location';

// 附近搜索意图
export interface NearbySearchResult {
	type: 'nearby_search';
	center: Location;
	pois: POI[];
	radius?: number;
	category?: string;
}
