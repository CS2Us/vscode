/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { URI } from '../../../../base/common/uri.js';
import { Emitter, Event } from '../../../../base/common/event.js';
import { EditorPane } from '../../../browser/parts/editor/editorPane.js';
import { EditorInput } from '../../../common/editor/editorInput.js';
import * as mapboxgl from 'mapbox-gl';
import { Dimension, IDomPosition } from '../../../../base/browser/dom.js';

export class MapEditorInput extends EditorInput {
	override get typeId(): string {
		return 'workbench.editor.mapInput';
	}

	override get resource(): URI | undefined {
		return undefined;
	}

}

export interface MapCenterChangeEvent {
	lng: number;
	lat: number;
}

export class MapEditorPane extends EditorPane {
	static readonly ID = 'workbench.editor.mapPane';
	static readonly MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ3VveWl5dWFuIiwiYSI6ImNtYW1scmYycjAzeWYya3E5emFvaDVjdGMifQ.XKF1nPPQQ8LDDbfievrgkA';

	private map: mapboxgl.Map | undefined;
	private readonly _onDidChangeCenter = this._register(new Emitter<MapCenterChangeEvent>());
	readonly onDidChangeCenter: Event<MapCenterChangeEvent> = this._onDidChangeCenter.event;

	override layout(dimension: Dimension, position?: IDomPosition): void {
		if (this.map) {
			this.map.resize();
		}
	}

	protected override createEditor(parent: HTMLElement): void {
		// 创建地图容器
		const container = document.createElement('div');
		container.style.width = '100%';
		container.style.height = '100%';
		parent.appendChild(container);

		// 设置Mapbox访问令牌
		mapboxgl.accessToken = MapEditorPane.MAPBOX_ACCESS_TOKEN;

		// 初始化地图
		this.map = new mapboxgl.Map({
			container: container,
			style: 'mapbox://styles/mapbox/streets-v11', // 地图样式
			center: [116.397428, 39.90923], // 默认中心点坐标（北京）
			zoom: 10 // 缩放级别
		});

		// 添加导航控件
		this.map.addControl(new mapboxgl.NavigationControl());

		// 添加比例尺
		this.map.addControl(new mapboxgl.ScaleControl({
			maxWidth: 100,
			unit: 'metric'
		}));

		// 地图加载完成事件
		this.map.on('load', () => {
			console.log('Map loaded');
			// 在这里可以添加更多地图加载后的逻辑
		});

		// 监听地图移动结束事件
		this.map.on('moveend', () => {
			if (this.map) {
				const center = this.map.getCenter();
				this._onDidChangeCenter.fire({
					lng: center.lng,
					lat: center.lat
				});
			}
		});
	}

	/**
	 * 设置地图中心点
	 * @param lng 经度
	 * @param lat 纬度
	 * @param silent 是否静默更新（不触发事件）
	 */
	public setCenter(lng: number, lat: number, silent: boolean = false): void {
		if (!this.map) {
			return;
		}

		// 更新地图中心点
		this.map.flyTo({
			center: [lng, lat],
			duration: 1000,
			easing: (t) => t // Linear easing function
		});

		// 触发中心点变化事件
		if (!silent) {
			this._onDidChangeCenter.fire({ lng, lat });
		}
	}

	/**
	 * 获取当前地图中心点
	 */
	public getCenter(): { lng: number; lat: number } | undefined {
		if (!this.map) {
			return undefined;
		}
		const center = this.map.getCenter();
		return { lng: center.lng, lat: center.lat };
	}

	// 清理资源
	public override dispose(): void {
		if (this.map) {
			this.map.remove();
			this.map = undefined;
		}
		super.dispose();
	}
}
