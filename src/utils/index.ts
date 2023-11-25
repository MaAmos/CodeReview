import * as vscode from "vscode";
import { INFO_NO_URI_MESSAGE } from "../constant/index";
import { createCodeReviewWebview } from "./createWebview";
import { isEmpty } from "./utils";
let CUR_WEBVIEW:vscode.WebviewPanel|null = null;
export const CALLBACK_CLICK_COMMAND = (context: vscode.ExtensionContext ,uri:vscode.Uri)=>{
		// 必须要有Uri 否则提示用户要选择对应的文件或者内容
	if(isEmpty(uri)){
		return vscode.window.showInformationMessage(INFO_NO_URI_MESSAGE);
	}
	// 请开工
	if(CUR_WEBVIEW) {
		CUR_WEBVIEW.dispose();
	}
	CUR_WEBVIEW = createCodeReviewWebview(context, uri);
};