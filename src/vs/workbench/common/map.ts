/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../base/common/lifecycle.js';
import { MapInput } from './map/mapInput.js';
import { IComposite } from './composite.js';
import { IInstantiationService } from '../../platform/instantiation/common/instantiation.js';

export const DEONE_MAP_ID = "workbench.deone.map";

export interface IMapDescriptor<T extends IMapPane> {
	/**
	 * The unique type identifier of the map. All instances
	 * of the same `IMapPane` should have the same type
	 * identifier.
	 */
	readonly typeId: string;

	/**
	 * The display name of the map.
	 */
	readonly name: string;

	/**
	 * Instantiates the map pane using the provided services.
	 */
	instantiate(instantiationService: IInstantiationService): T;

	/**
	 * Whether the descriptor is for the provided map pane.
	 */
	describes(mapPane: T): boolean;
}

export interface IMapPane extends IComposite {
	/**
	 * The assigned input of this map.
	 */
	readonly input: MapInput | undefined;

	/**
	 * The minimum width of this map.
	 */
	readonly minimumWidth: number;

	/**
	 * The maximum width of this map.
	 */
	readonly maximumWidth: number;

	/**
	 * The minimum height of this map.
	 */
	readonly minimumHeight: number;

	/**
	 * The maximum height of this map.
	 */
	readonly maximumHeight: number;

}

export abstract class AbstractMapInput extends Disposable {
	// Marker class for implementing `isMapInput`
}
