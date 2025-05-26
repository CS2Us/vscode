/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from '../../../platform/instantiation/common/instantiation.js';
import { Disposable } from '../../../base/common/lifecycle.js';
import { Emitter, Event } from '../../../base/common/event.js';
import { MapMarker } from './mapInteractionService.js';

export const IMapDataService = createDecorator<IMapDataService>('mapDataService');

export interface IMapDataService {
	/* 地图状态 */
	readonly zoom: number;
	readonly center: { latitude: number; longitude: number };

	/* 标记管理 */
	addMarker(marker: MapMarker): Disposable;
	removeMarker(markerId: string): void;
	updateMarker(marker: MapMarker): void;
	findMarker(markerId: string): MapMarker | undefined;

	/* 路径规划 */
	addPath(points: { latitude: number; longitude: number }[]): Disposable;
	removePath(pathId: string): void;
}

/**
 * 地图数据服务 (MapDataService)
 *
 * @description
 * 提供地图相关的数据管理功能，包括地图状态控制、标记管理、路径规划等功能。
 * 实现了IMapDataService接口，是地图功能的核心服务类。
 *
 * @features
 * - 地图状态管理：控制缩放级别和中心点位置
 * - 标记管理：添加、删除、更新和查询地图标记
 * - 路径规划：添加和移除地图路径
 */
export class MapDataService extends Disposable implements IMapDataService {
	// 事件发射器
	private readonly _onDidChangeZoom: Emitter<number>;
	readonly onDidChangeZoom: Event<number>;

	private readonly _onDidChangeCenter: Emitter<{ latitude: number; longitude: number }>;
	readonly onDidChangeCenter: Event<{ latitude: number; longitude: number }>;

	// 状态
	private _zoom: number = 1;
	private _center: { latitude: number; longitude: number } = { latitude: 0, longitude: 0 };

	// 存储标记和路径
	private readonly markers = new Map<string, MapMarker>();
	private readonly paths = new Map<string, { points: Array<{ latitude: number; longitude: number }> }>();

	// 实现接口属性
	public get zoom(): number {
		return this._zoom;
	}

	public get center(): { latitude: number; longitude: number } {
		return { ...this._center };
	}

	constructor() {
		super();

		// 初始化事件发射器
		this._onDidChangeZoom = new Emitter<number>();
		this.onDidChangeZoom = this._onDidChangeZoom.event;

		this._onDidChangeCenter = new Emitter<{ latitude: number; longitude: number }>();
		this.onDidChangeCenter = this._onDidChangeCenter.event;

		// 注册可释放资源
		this._register(this._onDidChangeZoom);
		this._register(this._onDidChangeCenter);
	}

	// 标记管理方法
	public addMarker(marker: MapMarker): Disposable {
		this.markers.set(marker.id, marker);
		// TODO: 触发标记添加事件

		return new class extends Disposable {
			constructor(private readonly _markerId: string) {
				super();
			}

			override dispose(): void {
				this._onDispose();
				super.dispose();
			}

			private _onDispose(): void {
				MapDataService.prototype.removeMarker.call(this, this._markerId);
			}
		}(marker.id);
	}

	public removeMarker(markerId: string): void {
		this.markers.delete(markerId);
		// TODO: 触发标记移除事件
	}

	public updateMarker(marker: MapMarker): void {
		if (this.markers.has(marker.id)) {
			this.markers.set(marker.id, marker);
			// TODO: 触发标记更新事件
		}
	}

	public findMarker(markerId: string): MapMarker | undefined {
		return this.markers.get(markerId);
	}

	// 路径管理方法
	public addPath(points: Array<{ latitude: number; longitude: number }>): Disposable {
		const pathId = `path-${Date.now()}`;
		this.paths.set(pathId, { points });
		// TODO: 触发路径添加事件

		return new class extends Disposable {
			constructor(private readonly _pathId: string) {
				super();
			}

			override dispose(): void {
				this._onDispose();
				super.dispose();
			}

			private _onDispose(): void {
				MapDataService.prototype.removePath.call(this, this._pathId);
			}
		}(pathId);
	}

	public removePath(pathId: string): void {
		this.paths.delete(pathId);
		// TODO: 触发路径移除事件
	}

	// 辅助方法
	public getMarkers(): MapMarker[] {
		return Array.from(this.markers.values());
	}

	public getPaths(): Array<{ id: string; points: Array<{ latitude: number; longitude: number }> }> {
		return Array.from(this.paths.entries()).map(([id, path]) => ({
			id,
			points: [...path.points]
		}));
	}
}
