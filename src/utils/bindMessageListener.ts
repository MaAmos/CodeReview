import * as vscode from "vscode";
import { CodeType, TypeSendMessage } from "../type/index";


import { isString, CODE_CALLBACK_FN, formatTextEditorContent,getGitUrlOfWorkspace } from "./utils";

export function bindMessageListener(panel:vscode.WebviewPanel,uri: vscode.Uri){
    // 绑定接收客户端监听
    bindReceiveListener(panel,uri);
    // 发送消息给客户端
    postMessageFn(panel,uri);

}


function bindReceiveListener(panel:vscode.WebviewPanel,uri: vscode.Uri){
    panel.webview.onDidReceiveMessage(event=>{
        let data:TypeSendMessage = event;
        if(isString(event)){
            data = {code: event};
        }
        // 获取是否绑定了对应类型的事件回调函数
        const codeCB = CODE_CALLBACK_FN[data.code as CodeType];
        // 如果生命了对应类型的回调函数就执行 如果没有的话就return
        if(codeCB){
            codeCB(panel,event.value);
        }else {
            console.log("你发送的事件我没有做监听函数，所以白发了！！");
        }

    });
}

function postMessageFn(panel:vscode.WebviewPanel,uri:vscode.Uri){
    const result = {
        file: formatTextEditorContent(uri),
        gitUrl: getGitUrlOfWorkspace()
    };
    console.log(result,"result data");
    // 发送当前的文件链接给HTML文件
    panel.webview.postMessage(result);
}