/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { NearbySearchResult } from '../types';

export function handleNearbySearch(intent: string, indices: number[]): NearbySearchResult | null {
	if (!intent.includes('附近银行')) {
		return null;
	}

	// TODO: 使用 indices 来提取具体的位置信息和搜索类别
	return {
		type: 'nearby_search',
		center: { name: '当前位置' },
		pois: [
			{ name: '招商银行', lat: 23.1291, lng: 113.2644, type: 'bank' },
			{ name: '工商银行', lat: 23.1292, lng: 113.2645, type: 'bank' }
		],
		category: 'bank'
	};
}
