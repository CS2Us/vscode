/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { getNonce } from '../utils';

export class PreviewManager {
	private static readonly viewType = 'deone.preview';
	private static currentPanel: vscode.WebviewPanel | undefined;

	public static createOrShow(content: string, title: string = 'Preview') {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// 如果已经有面板，就显示它
		if (PreviewManager.currentPanel) {
			PreviewManager.currentPanel.reveal(column);
			PreviewManager.currentPanel.webview.html = PreviewManager.getHtmlForWebview(content);
			return;
		}

		// 否则，创建一个新的面板
		const panel = vscode.window.createWebviewPanel(
			PreviewManager.viewType,
			title,
			column || vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
				localResourceRoots: [
					vscode.Uri.joinPath(vscode.extensions.getExtension('deone.chat')!.extensionUri, 'media')
				]
			}
		);

		PreviewManager.currentPanel = panel;
		panel.webview.html = PreviewManager.getHtmlForWebview(content);

		// 当面板关闭时，清除引用
		panel.onDidDispose(
			() => {
				PreviewManager.currentPanel = undefined;
			},
			null
		);
	}

	private static getHtmlForWebview(content: string): string {
		const nonce = getNonce();
		const cspSource = PreviewManager.currentPanel?.webview.cspSource;

		return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
            <style>
                body {
                    padding: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }
                .preview-container {
                    max-width: 800px;
                    margin: 0 auto;
                }
            </style>
        </head>
        <body>
            <div class="preview-container">
                ${content}
            </div>
            <script nonce="${nonce}">
                // 这里可以添加与VSCode通信的代码
                const vscode = acquireVsCodeApi();
            </script>
        </body>
        </html>`;
	}
}
