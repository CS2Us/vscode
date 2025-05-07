/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Location, POI } from './location';
import { RoutePlanningResult } from './route';
import { NearbySearchResult } from './nearby';
import { GeneralResult } from './general';

export { Location, POI, RoutePlanningResult, NearbySearchResult, GeneralResult };

// 所有可能的结果类型
export type ThemeResult = RoutePlanningResult | NearbySearchResult | GeneralResult;
