/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { IChatResult } from './api/chatResult';
import { PreviewManager } from './preview/previewManager';
import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

const deepseekHandler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest,
	context: vscode.ChatContext,
	stream: vscode.ChatResponseStream,
	token: vscode.CancellationToken
): Promise<IChatResult> => {
	return new Promise(async (resolve, reject) => {

	});
};

export async function activate(context: vscode.ExtensionContext) {
	vscode.chat.createChatParticipant("chat-sample.deepseek", deepseekHandler);

	// 注册预览命令
	let disposable = vscode.commands.registerCommand('deone.preview', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const content = document.getText();
			PreviewManager.createOrShow(content, document.fileName);
		}
	});

	context.subscriptions.push(disposable);
}
