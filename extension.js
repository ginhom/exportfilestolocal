// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloword" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.exportToLocal', function (...resourceStates) {
		// The code you place here will be executed every time your command is executed

		const options = {
			canSelectMany: false,
			canSelectFiles: false,
			canSelectFolders: true,
			openLabel: 'Select export floder',
			filters: {
				'All files': ['*']
			}
		};
		vscode.window.showOpenDialog(options).then(fileUri => {
			if (fileUri && fileUri[0]) {
				console.log('Selected file: ' + fileUri[0].fsPath);
				// Display a message box to the user
				const exportDir = fileUri[0].fsPath;
				for (var rs of resourceStates) {
					console.log(rs.resourceUri.path);
					const fileName = path.basename(rs.resourceUri.path);
					const resultPath = path.join(exportDir, fileName);
					fs.writeFileSync(resultPath, fs.readFileSync(rs.resourceUri.path));
					// vscode.window.showInformationMessage(`当前文件(夹)路径是：${rs.resourceUri.path}`);
				}
			}
		});

	});

	context.subscriptions.push(disposable);
	// context.subscriptions.push(vscode.commands.registerCommand('extension.getCurrentFilePath', (uri) => {
	// 	vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
	// }));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
