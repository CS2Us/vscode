/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Widget } from '../../../../base/browser/ui/widget.js';
import mapboxgl from 'mapbox-gl';

export class MapWidget extends Widget {
	private static readonly MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ3VveWl5dWFuIiwiYSI6ImNtYW1scmYycjAzeWYya3E5emFvaDVjdGMifQ.XKF1nPPQQ8LDDbfievrgkA';
	private map: mapboxgl.Map | undefined;

	constructor() {
		super();
	}

	render(parent: HTMLElement): void {
		this.map = new mapboxgl.Map({
			container: parent,
			style: 'mapbox://styles/mapbox/streets-v11',
			accessToken: MapWidget.MAPBOX_ACCESS_TOKEN,
			center: [0, 0],
			zoom: 1
		});
	}
}
