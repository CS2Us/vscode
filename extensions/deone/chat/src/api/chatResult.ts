/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { processText } from './rpcClient';
import { ThemeResult } from './types';
import { handleRoutePlanning, handleNearbySearch, handleGeneral } from './handlers';

interface ChatIntent {
	intent: string;
	indices: number[];
}

// 基础位置接口
interface Location {
	name: string;
	lat?: number;
	lng?: number;
}

// POI接口
interface POI {
	name: string;
	lat: number;
	lng: number;
	type?: string;
	distance?: number;
}

// 路径规划意图
interface RoutePlanningResult {
	type: 'route_planning';
	start: Location;
	end: Location;
	waypoints?: Location[];
	transportMode?: 'driving' | 'walking' | 'transit';
}

// 附近搜索意图
interface NearbySearchResult {
	type: 'nearby_search';
	center: Location;
	pois: POI[];
	radius?: number;
	category?: string;
}

// 天气查询意图
interface WeatherResult {
	type: 'weather';
	location: Location;
	forecast?: {
		date: string;
		temperature: number;
		condition: string;
	}[];
}

// 通用意图
interface GeneralResult {
	type: 'general';
	message: string;
}

// 所有可能的结果类型
type ThemeResult = RoutePlanningResult | NearbySearchResult | WeatherResult | GeneralResult;

export class IChatResult implements vscode.ChatResult {
	response: vscode.MarkdownString | vscode.ChatResponseMarkdownPart;
	metadata?: {
		userId?: string;
		topic?: string;
		content?: string;
	};

	async parse(request: vscode.ChatRequest) {
		try {
			// 1. 通过RPC发送到Python处理，获取意图
			const result = await processText(request.prompt);

			// 2. 根据意图匹配主题
			const themeResult = this.matchTheme(result.intent, result.indices);

			// 3. 返回结果给VSCode UI
			return {
				...themeResult,
				intent: result.intent,
				indices: result.indices
			};
		} catch (error) {
			console.error('Failed to parse chat request:', error);
			throw error;
		}
	}

	private matchTheme(intent: string, indices: number[]): ThemeResult {
		// 按优先级尝试不同的处理器
		const routeResult = handleRoutePlanning(intent, indices);
		if (routeResult) return routeResult;

		const nearbyResult = handleNearbySearch(intent, indices);
		if (nearbyResult) return nearbyResult;

		// 如果没有匹配到特定意图，返回通用结果
		return handleGeneral(intent);
	}
}
