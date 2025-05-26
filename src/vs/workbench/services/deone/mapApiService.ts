/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Event } from '../../../base/common/event.js';
import { createDecorator } from '../../../platform/instantiation/common/instantiation.js';
import { MapMarker } from './mapInteractionService.js';

export const IMapApiService = createDecorator<IMapApiService>('mapApiService');

/**
 * ApiService 是地图模块下的 API 调用服务，负责统一封装与地图相关的后端接口请求。
 * 主要职责包括：
 * 1. 根据地图上的用户操作（如选中起点、终点、路径规划等）发起对应的 API 请求，并处理返回结果。
 * 2. 负责 API 请求的统一封装、错误处理和数据格式转换。
 * 3. 与 mapService、UI 层等其他模块协作，提供标准化的数据接口。
 * 4. 支持请求的缓存、权限校验及重试等机制（如有）。
 */
export interface IMapApiService {
	/**
	 * 获取点信息，根据 marker.type 区分起点、终点或经过点
	 */
	getMarkerInfo(marker: MapMarker): Promise<any>;

	/**
	 * 路径规划
	 */
	getRoute(start: MapMarker, end: MapMarker): Promise<any>;
}
