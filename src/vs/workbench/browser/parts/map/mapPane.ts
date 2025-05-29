/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IMapPane } from '../../../common/map.js';
import { Composite } from '../../composite.js';
import { MapInput } from '../../../common/map/mapInput.js';
import { Dimension } from '../../../../base/browser/dom.js';
import { MapWidget } from '../../../contrib/deone/browser/mapWidget.js';

const DEFAULT_EDITOR_MIN_DIMENSIONS = new Dimension(220, 70);
const DEFAULT_EDITOR_MAX_DIMENSIONS = new Dimension(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

export abstract class MapPane extends Composite implements IMapPane {
	private widget: MapWidget | undefined;

	get minimumWidth() { return DEFAULT_EDITOR_MIN_DIMENSIONS.width; }
	get maximumWidth() { return DEFAULT_EDITOR_MAX_DIMENSIONS.width; }
	get minimumHeight() { return DEFAULT_EDITOR_MIN_DIMENSIONS.height; }
	get maximumHeight() { return DEFAULT_EDITOR_MAX_DIMENSIONS.height; }

	protected _input: MapInput | undefined;
	get input(): MapInput | undefined { return this._input; }

	override create(parent: HTMLElement): void {
		super.create(parent);
		this.widget = new MapWidget();
		this.widget.render(parent);
	}
}
