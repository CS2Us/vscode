/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../../../nls.js';
import { VIEW_ID } from '../common/map.js';
import { ViewPane } from '../../../browser/parts/views/viewPane.js';
import { IViewletViewOptions } from '../../../browser/parts/views/viewsViewlet.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IViewDescriptorService } from '../../../common/views.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IHoverService } from '../../../../platform/hover/browser/hover.js';
import { IAccessibleViewInformationService } from '../../../services/accessibility/common/accessibleViewInformationService.js';
import { IEditorGroupsService } from '../../../services/editor/common/editorGroupsService.js';

export class MapView extends ViewPane {
	static readonly ID = VIEW_ID;
	static readonly NAME = localize('map', "Map");

	constructor(
		options: IViewletViewOptions,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IOpenerService openerService: IOpenerService,
		@IThemeService themeService: IThemeService,
		@ITelemetryService telemetryService: ITelemetryService,
		@IHoverService hoverService: IHoverService,
		@IAccessibleViewInformationService accessibleViewService: IAccessibleViewInformationService,
		@IEditorGroupsService private readonly editorGroupService: IEditorGroupsService
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService, accessibleViewService);
	}

	private createNewWindowButton(): HTMLElement {
		const button = document.createElement('div');
		button.className = 'new-window-button';
		const locale = this.configurationService.getValue('i18n.locale');
		button.title = locale === 'zh-cn' ? '新建窗口' : 'Open New Window';

		// 创建图标
		const icon = document.createElement('div');
		icon.className = 'codicon codicon-window';
		button.appendChild(icon);

		// 添加点击事件
		button.addEventListener('click', () => {
			// 创建新的编辑组
			this.editorGroupService.addGroup(this.editorGroupService.activeGroup, 1);
		});

		return button;
	}

	protected override renderBody(container: HTMLElement): void {
		super.renderBody(container);
		container.classList.add('map-view');

		// 添加样式
		const styleElement = document.createElement('style');
		styleElement.textContent = `
			.map-view .new-window-button {
				display: flex;
				align-items: center;
				padding: 4px 8px;
				border-radius: 4px;
				cursor: pointer;
				background: var(--vscode-button-background);
				color: var(--vscode-button-foreground);
				margin: 4px;
			}

			.map-view .new-window-button:hover {
				background: var(--vscode-button-hoverBackground);
			}

			.map-view .new-window-button .codicon {
				width: 16px;
				height: 16px;
			}
		`;
		container.appendChild(styleElement);

		// 创建并添加新窗口按钮
		const newWindowButton = this.createNewWindowButton();
		container.appendChild(newWindowButton);
	}

	protected override layoutBody(height: number, width: number): void {
		super.layoutBody(height, width);
	}

	override focus(): void {
		// Implement focus logic here
	}
}
