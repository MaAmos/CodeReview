import * as vscode from "vscode";
import { getHTMLContentToWebview } from "./utils";
import { bindMessageListener } from "./bindMessageListener";
import { WEBVIEW_KEY_CODE_REVIEW,CODE_REVIEW_TITLE, URL_WEBVIEW_HTML } from "../constant/index";

const VS_WINDOW = vscode.window;
export const createCodeReviewWebview = (context: vscode.ExtensionContext,uri:vscode.Uri)=>{
    // 创建并显示新的webview
    let crWebview = VS_WINDOW.createWebviewPanel(
        WEBVIEW_KEY_CODE_REVIEW,
        CODE_REVIEW_TITLE,
        { viewColumn: vscode.ViewColumn.Beside }, // 向右拆分打开新编辑器
        {
            enableScripts:true, // 支持执行js代码
            // retainContextWhenHidden: true, // webview被隐藏时保持状态
        } // Webview选项
    );
    crWebview.webview.html = getHTMLContentToWebview(context,URL_WEBVIEW_HTML);
    // 监听html发送的提交意见
    bindMessageListener(crWebview,uri);
    return crWebview;
};
