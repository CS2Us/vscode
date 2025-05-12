/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../../../nls.js';
import { RawContextKey } from '../../../../platform/contextkey/common/contextkey.js';

export const VIEWLET_ID = 'workbench.view.map';
export const VIEW_ID = 'workbench.view.map.view';

export const MapViewletVisibleContext = new RawContextKey<boolean>('mapViewletVisible', true, { type: 'boolean', description: localize('mapViewletVisible', "True when the MAP viewlet is visible.") });
