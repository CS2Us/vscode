/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { GeneralResult } from '../types';

export function handleGeneral(intent: string): GeneralResult {
	return {
		type: 'general',
		message: '无法识别的意图'
	};
}
