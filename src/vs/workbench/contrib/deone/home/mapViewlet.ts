/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/mapViewlet.css';
import { localize, localize2 } from '../../../../nls.js';
import { VIEWLET_ID, VIEW_ID, MapViewletVisibleContext } from '../common/map.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IExtensionService } from '../../../services/extensions/common/extensions.js';
import { IWorkspaceContextService } from '../../../../platform/workspace/common/workspace.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IContextKeyService, IContextKey } from '../../../../platform/contextkey/common/contextkey.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IViewsRegistry, IViewDescriptor, Extensions, ViewContainer, IViewContainersRegistry, ViewContainerLocation, IViewDescriptorService } from '../../../common/views.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { IWorkbenchContribution } from '../../../common/contributions.js';
import { ViewPaneContainer } from '../../../browser/parts/views/viewPaneContainer.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { registerIcon } from '../../../../platform/theme/common/iconRegistry.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IWorkbenchLayoutService, Parts } from '../../../../workbench/services/layout/browser/layoutService.js';
import { MapView } from './mapView.js';
import { CommandsRegistry } from '../../../../platform/commands/common/commands.js';

const mapViewIcon = registerIcon('map-view-icon', Codicon.map, localize('mapViewIcon', 'View icon of the map view.'));

const viewsRegistry = Registry.as<IViewsRegistry>(Extensions.ViewsRegistry);

export class MapViewletViewsContribution extends Disposable implements IWorkbenchContribution {
	static readonly ID = 'workbench.contrib.mapViewletViews';
	static readonly SHOW_MAP_COMMAND_ID = 'workbench.map.showMapView';

	constructor(
		@IWorkbenchLayoutService private readonly layoutService: IWorkbenchLayoutService
	) {
		super();
		this.registerViews();
		this.registerCommands();
		this.initMapView();
	}

	private registerCommands(): void {
		CommandsRegistry.registerCommand({
			id: MapViewletViewsContribution.SHOW_MAP_COMMAND_ID,
			handler: () => this.layoutService.setPartHidden(false, Parts.SIDEBAR_PART)
		});
	}

	private initMapView(): void {
		// 在工作台初始化完成后显示MapViewlet
		this.layoutService.setPartHidden(false, Parts.SIDEBAR_PART);
	}

	private registerViews(): void {
		const viewDescriptors = viewsRegistry.getViews(VIEW_CONTAINER);
		const viewDescriptorsToRegister: IViewDescriptor[] = [];

		const mapViewDescriptor = this.createMapViewDescriptor();
		if (!viewDescriptors.some((v: IViewDescriptor) => v.id === mapViewDescriptor.id)) {
			viewDescriptorsToRegister.push(mapViewDescriptor);
		}

		if (viewDescriptorsToRegister.length) {
			viewsRegistry.registerViews(viewDescriptorsToRegister, VIEW_CONTAINER);
		}
	}

	private createMapViewDescriptor(): IViewDescriptor {
		return {
			id: VIEW_ID,
			name: localize2('map', "Map"),
			containerIcon: mapViewIcon,
			ctorDescriptor: new SyncDescriptor(MapView),
			order: 0,
			canToggleVisibility: true,
			canMoveView: true,
			focusCommand: {
				id: 'workbench.map.view.focus'
			}
		};
	}
}

export class MapViewPaneContainer extends ViewPaneContainer {
	private viewletVisibleContextKey: IContextKey<boolean>;

	constructor(
		@IWorkbenchLayoutService layoutService: IWorkbenchLayoutService,
		@ITelemetryService telemetryService: ITelemetryService,
		@IWorkspaceContextService contextService: IWorkspaceContextService,
		@IStorageService storageService: IStorageService,
		@IConfigurationService configurationService: IConfigurationService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IThemeService themeService: IThemeService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IExtensionService extensionService: IExtensionService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@ILogService logService: ILogService,
	) {
		super(VIEWLET_ID, { mergeViewWithContainerWhenSingleView: true }, instantiationService, configurationService, layoutService, contextMenuService, telemetryService, extensionService, themeService, storageService, contextService, viewDescriptorService, logService);
		this.viewletVisibleContextKey = MapViewletVisibleContext.bindTo(contextKeyService);
	}

	override create(parent: HTMLElement): void {
		super.create(parent);
		parent.classList.add('map-viewlet');
	}

	override setVisible(visible: boolean): void {
		this.viewletVisibleContextKey.set(visible);
		super.setVisible(visible);
	}

	override focus(): void {
		const mapView = this.getView(VIEW_ID);
		if (mapView?.isExpanded()) {
			mapView.focus();
		} else {
			super.focus();
		}
	}
}

const viewContainerRegistry = Registry.as<IViewContainersRegistry>(Extensions.ViewContainersRegistry);

export const VIEW_CONTAINER: ViewContainer = viewContainerRegistry.registerViewContainer({
	id: VIEWLET_ID,
	title: localize2('map', "Map"),
	ctorDescriptor: new SyncDescriptor(MapViewPaneContainer),
	storageId: 'workbench.map.views.state',
	icon: mapViewIcon,
	alwaysUseContainerInfo: true,
	hideIfEmpty: true,
	order: 0
}, ViewContainerLocation.Sidebar);
