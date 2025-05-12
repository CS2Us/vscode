/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerWorkbenchContribution2 } from '../../../common/contributions.js';
import { MapViewletViewsContribution } from './mapViewlet.js';
import { WorkbenchPhase } from '../../../common/contributions.js';

registerWorkbenchContribution2(MapViewletViewsContribution.ID, MapViewletViewsContribution, WorkbenchPhase.BlockRestore);
