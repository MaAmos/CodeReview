
import * as vscode from 'vscode';
import { CODE_REVIEW_COMMAND } from "./constant/index";
import { CALLBACK_CLICK_COMMAND } from "./utils/index";


export function activate(context: vscode.ExtensionContext) {
	const V_COMMANDS = vscode.commands;
  /**
   * 回调函数接收一个可选参数uri：
   *
   * 当从资源管理器中右键执行命令时会把当前选中资源路径uri作为参数传过；
     当从编辑器中右键菜单执行时则会将当前打开文件路径URI传过去；
     当直接按Ctrl+Shift+P执行命令时，这个参数为空；
  */
	context.subscriptions.push(V_COMMANDS.registerCommand(CODE_REVIEW_COMMAND,(uri)=>{CALLBACK_CLICK_COMMAND(context,uri);}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
