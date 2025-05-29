/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { MapPane } from './parts/map/mapPane.js';
import { IMapDescriptor } from '../common/map.js';
import { IDisposable, toDisposable } from '../../base/common/lifecycle.js';
import { MapInput } from '../common/map/mapInput.js';

export interface IMapPaneDescriptor extends IMapDescriptor<MapPane> { }

export interface IMapPaneRegistry {
	registerMapPane(mapPaneDescriptor: IMapPaneDescriptor): IDisposable;

	getMapPane(map: MapInput): IMapPaneDescriptor | undefined;
}

export class MapPaneRegistry implements IMapPaneRegistry {
	private mapPaneDescriptors = new Map<string, IMapPaneDescriptor>();

	registerMapPane(mapPaneDescriptor: IMapPaneDescriptor): IDisposable {
		this.mapPaneDescriptors.set(mapPaneDescriptor.typeId, mapPaneDescriptor);

		return toDisposable(() => {
			this.mapPaneDescriptors.delete(mapPaneDescriptor.typeId);
		});
	}

	getMapPane(map: MapInput): IMapPaneDescriptor | undefined {
		return this.mapPaneDescriptors.get(map.typeId);
	}
}
