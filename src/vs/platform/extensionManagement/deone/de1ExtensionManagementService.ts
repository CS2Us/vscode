/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { InstallExtensionEvent, InstallExtensionResult, UninstallExtensionEvent, DidUninstallExtensionEvent, DidUpdateExtensionMetadata, ILocalExtension, IGalleryExtension, InstallOptions, IExtensionIdentifier, UninstallOptions, InstallExtensionInfo, UninstallExtensionInfo, IProductVersion, IExtensionsControlManifest, Metadata, InstallOperation, IAllowedExtensionsService } from '../common/extensionManagement.js';
import { Emitter } from '../../../base/common/event.js';
import { URI } from '../../../base/common/uri.js';
import { ExtensionType } from '../../../platform/extensions/common/extensions.js';
import { CommontExtensionManagementService } from '../common/abstractExtensionManagementService.js';
import { IProductService } from '../../../platform/product/common/productService.js';
import { TargetPlatform } from '../../../platform/extensions/common/extensions.js';
import { IExtensionManagementParticipant } from '../common/extensionManagement.js';
import { IExtensionManifest } from '../../../platform/extensions/common/extensions.js';

export class De1ExtensionManagementService extends CommontExtensionManagementService {
	private readonly _onInstallExtension = this._register(new Emitter<InstallExtensionEvent>());
	readonly onInstallExtension = this._onInstallExtension.event;

	private readonly _onDidInstallExtensions = this._register(new Emitter<InstallExtensionResult[]>());
	readonly onDidInstallExtensions = this._onDidInstallExtensions.event;

	private readonly _onUninstallExtension = this._register(new Emitter<UninstallExtensionEvent>());
	readonly onUninstallExtension = this._onUninstallExtension.event;

	private readonly _onDidUninstallExtension = this._register(new Emitter<DidUninstallExtensionEvent>());
	readonly onDidUninstallExtension = this._onDidUninstallExtension.event;

	private readonly _onDidUpdateExtensionMetadata = this._register(new Emitter<DidUpdateExtensionMetadata>());
	readonly onDidUpdateExtensionMetadata = this._onDidUpdateExtensionMetadata.event;

	constructor(
		@IProductService protected override readonly productService: IProductService,
		@IAllowedExtensionsService protected override readonly allowedExtensionsService: IAllowedExtensionsService,
	) {
		super(productService, allowedExtensionsService);
	}

	async installFromGallery(extension: IGalleryExtension, options: InstallOptions = {}): Promise<ILocalExtension> {
		// Empty implementation
		return {} as ILocalExtension;
	}

	async installGalleryExtensions(extensions: InstallExtensionInfo[]): Promise<InstallExtensionResult[]> {
		// Empty implementation
		return [];
	}

	async uninstall(extension: ILocalExtension, options: UninstallOptions = {}): Promise<void> {
		// Empty implementation
	}

	async uninstallExtensions(extensions: UninstallExtensionInfo[]): Promise<void> {
		// Empty implementation
	}

	async toggleAppliationScope(extension: ILocalExtension, fromProfileLocation: URI): Promise<ILocalExtension> {
		// Empty implementation
		return extension;
	}

	async getExtensionsControlManifest(): Promise<IExtensionsControlManifest> {
		// Empty implementation
		return {} as IExtensionsControlManifest;
	}

	async resetPinnedStateForAllUserExtensions(pinned: boolean): Promise<void> {
		// Empty implementation
	}

	registerParticipant(participant: IExtensionManagementParticipant): void {
		// Empty implementation
	}

	async getTargetPlatform(): Promise<TargetPlatform> {
		// Empty implementation
		return TargetPlatform.UNKNOWN;
	}

	async zip(extension: ILocalExtension): Promise<URI> {
		// Empty implementation
		return URI.parse('');
	}

	async getManifest(vsix: URI): Promise<IExtensionManifest> {
		// Empty implementation
		return {} as IExtensionManifest;
	}

	async install(vsix: URI, options: InstallOptions = {}): Promise<ILocalExtension> {
		// Empty implementation
		return {} as ILocalExtension;
	}

	async installFromLocation(location: URI, profileLocation: URI): Promise<ILocalExtension> {
		// Empty implementation
		return {} as ILocalExtension;
	}

	async installExtensionsFromProfile(extensions: IExtensionIdentifier[], fromProfileLocation: URI, toProfileLocation: URI): Promise<ILocalExtension[]> {
		// Empty implementation
		return [];
	}

	async getInstalled(type?: ExtensionType, profileLocation?: URI, productVersion?: IProductVersion): Promise<ILocalExtension[]> {
		// Empty implementation
		return [];
	}

	async copyExtensions(fromProfileLocation: URI, toProfileLocation: URI): Promise<void> {
		// Empty implementation
	}

	async download(extension: IGalleryExtension, operation: InstallOperation, donotVerifySignature: boolean): Promise<URI> {
		// Empty implementation
		return URI.parse('');
	}

	async cleanUp(): Promise<void> {
		// Empty implementation
	}

	async updateMetadata(local: ILocalExtension, metadata: Partial<Metadata>, profileLocation: URI): Promise<ILocalExtension> {
		// Empty implementation
		return local;
	}
}

