/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Event, Emitter } from '../../../base/common/event.js';
import { createDecorator } from '../../../platform/instantiation/common/instantiation.js';

export const IMapInteractionService = createDecorator<IMapInteractionService>('mapInteractionService');

export interface IMapInteractionService {
	/**
	 * 订阅地图标记点击事件
	 * @param handler 回调，参数为被点击的标记信息
	 */
	onMarkerClick: Event<MapMarker>;

	/**
	 * 取消订阅地图标记点击事件
	 * @param handler 之前注册的回调
	 */
	offMarkerClick: Event<MapMarker>;
}

/**
 * 路线信息类型定义
 */
export interface MapRoute {
	path: { x: number; y: number }[];
	distance?: number;
	duration?: number;
	[key: string]: any;
}


export type MarkerType = 'start' | 'end' | 'waypoint';

export interface MapMarker {
	id: string;
	lat: number;
	lng: number;
	type: MarkerType;
	// ...其他字段
}

