/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { RoutePlanningResult, RouteDetail, AmapRouteResponse } from '../types';
import axios from 'axios';

const AMAP_KEY = process.env.AMAP_KEY || 'your_amap_key_here';
const AMAP_ROUTE_API = 'https://restapi.amap.com/v3/direction/driving';

export function handleRoutePlanning(intent: string, indices: number[]): RoutePlanningResult | null {
	if (!intent.includes('路径规划')) {
		return null;
	}

	// TODO: 使用 indices 来提取具体的位置信息
	return {
		type: 'route_planning',
		start: { name: '广州白云永泰站' },
		end: { name: '广州海珠客村站' },
		transportMode: 'transit'
	};
}

async function getRouteDetail(start: string, end: string): Promise<RouteDetail> {
	try {
		const response = await axios.get<AmapRouteResponse>(AMAP_ROUTE_API, {
			params: {
				key: AMAP_KEY,
				origin: start,
				destination: end,
				extensions: 'all'
			}
		});

		if (response.data.status !== '1') {
			throw new Error(`高德地图API错误: ${response.data.info}`);
		}

		const path = response.data.route.paths[0];
		return {
			distance: path.distance,
			duration: path.duration,
			steps: path.steps.map(step => ({
				instruction: step.instruction,
				distance: step.distance,
				duration: step.duration,
				road: step.road,
				location: parseLocation(step.location)
			})),
			tolls: path.tolls,
			tollDistance: path.toll_distance,
			trafficLights: path.traffic_lights
		};
	} catch (error) {
		console.error('获取路径规划失败:', error);
		throw error;
	}
}

function parseLocation(locationStr: string) {
	const [lng, lat] = locationStr.split(',').map(Number);
	return { lat, lng };
}

function _routePlanning() {
	// 1. 路径规划需要调用高德的路径规划接口 https://amap.apifox.cn/doc-538962
	// 2. 为了防止返回内容依赖，需要定义抽象层，来表达路径规划的数据
}
