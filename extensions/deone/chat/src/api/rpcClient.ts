/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { spawn } from 'child_process';

let pythonProcess: any = null;
let requestQueue: { text: string, resolve: Function, reject: Function }[] = [];
let isProcessing = false;

function startPythonProcess() {
	if (pythonProcess) return;

	pythonProcess = spawn('python', ['rpyc_client.py']);

	pythonProcess.stdout.on('data', (data: Buffer) => {
		const output = data.toString();
		if (requestQueue.length > 0) {
			const { resolve } = requestQueue.shift()!;
			try {
				resolve(JSON.parse(output));
			} catch (error) {
				console.error('Failed to parse Python output:', error);
			}
		}
		isProcessing = false;
		processNextRequest();
	});

	pythonProcess.stderr.on('data', (data: Buffer) => {
		console.error('Python process error:', data.toString());
		if (requestQueue.length > 0) {
			const { reject } = requestQueue.shift()!;
			reject(new Error(data.toString()));
		}
		isProcessing = false;
		processNextRequest();
	});

	pythonProcess.on('close', (code: number) => {
		console.log(`Python process exited with code ${code}`);
		pythonProcess = null;
		// 如果进程意外退出，重新启动
		startPythonProcess();
	});
}

function processNextRequest() {
	if (isProcessing || requestQueue.length === 0) return;

	isProcessing = true;
	const { text } = requestQueue[0];
	pythonProcess.stdin.write(text + '\n');
}

export function processText(text: string): Promise<{ intent: string, indices: number[] }> {
	return new Promise((resolve, reject) => {
		if (!pythonProcess) {
			startPythonProcess();
		}

		requestQueue.push({ text, resolve, reject });
		processNextRequest();
	});
}
