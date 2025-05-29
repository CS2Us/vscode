/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AbstractMapInput } from '../map.js';
import type { MapMarker, MapRoute } from '../../services/deone/mapInteractionService.js';

/**
 * MapInput 作为地图模块的数据输入对象，供最外层地图容器使用。
 *
 * 主要作用：
 *   - 承载地图渲染所需的所有数据，包括但不限于用户的起点、终点、途经点、路线、标记等。
 *   - 作为地图编辑器或地图视图的统一数据入口，便于不同模块间的数据传递和状态管理。
 *   - 支持用户自定义的路径规划、地图标记、交互信息等。
 *
 * 典型字段（需在类中补充实现）：
 *   - origin: 起点（如用户当前位置或指定起点）
 *   - destination: 终点（如用户目标位置）
 *   - waypoints: 途经点（可选）
 *   - markers: 地图上的自定义标记
 *   - route: 路线信息（如导航路径）
 *
 * 用法说明：
 *   - 由地图主容器或上层业务模块创建和传递。
 *   - 支持序列化与反序列化，便于持久化和网络传输。
 *   - 结合 IMapInteractionService 等服务进行地图数据的动态更新。
 *
 * 备注：
 *   - MapInput 仅为数据载体，具体地图渲染和交互逻辑由下层服务和组件实现。
 */
export class MapInput extends AbstractMapInput {
	/**
	 * MapInput 的类型 ID，用于标识 MapInput 的类型。
	 */
	public typeId: string;
	/**
	 * 起点（如用户当前位置或指定起点）
	 */
	public origin: string;

	/**
	 * 终点（如用户目标位置）
	 */
	public destination: string;

	/**
	 * 途经点（可选）
	 */
	public waypoints?: string[];

	/**
	 * 地图上的自定义标记（可选）
	 */
	public markers?: MapMarker[];

	/**
	 * 路线信息（如导航路径，可选）
	 */
	public route?: MapRoute;

	constructor(params: {
		typeId: string;
		origin: string;
		destination: string;
		waypoints?: string[];
		markers?: MapMarker[];
		route?: MapRoute;
	}) {
		super();
		this.typeId = params.typeId;
		this.origin = params.origin;
		this.destination = params.destination;
		this.waypoints = params.waypoints;
		this.markers = params.markers;
		this.route = params.route;
	}
}
