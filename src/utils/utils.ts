/**
 *  存放共用函数
 *
 * */
import * as vscode from "vscode";
import path from "path";
import fs from "fs";
import axios from "axios";

import { URL_SEND_MESSAGE_HTTP, TEMPLATE_SEND_MESSAGE, CODE_REVIEW_CONFIG_PORPS } from "../constant/index";
import { SendMessage, CodeType, TypeCodeCallbackFn } from "../type/index";


// 校验当前value值是否为空
export const isEmpty = (value: vscode.Uri | string | null | undefined)=>{
    return !value && typeof value === 'object' || typeof value === 'undefined';
};

// 校验当前value值为字符串
export function isString(value:string | Object){
    return typeof value === "string";

}

/**
 *  读取html中的内容 显示在web view中
 * @param context 上下文
 * @param url html文件路径  src/template/index.html
 *
*/

export function getHTMLContentToWebview(context:vscode.ExtensionContext,url:string){
    console.log(context.extensionPath,"extensionPath");
    let fileUrl = path.join(context.extensionPath,url);
    console.log(fileUrl,"fileUrl  sssssss data");
    let html = fs.readFileSync(fileUrl,"utf-8");
    console.log(html,"html data");
    return html;
}

/**
 *
 *
 *
*/

const CODE_SEND_MESSAGE = "CONFIRM"; //　发送消息事件
const CODE_CANCEL = "CANCEL"; //取消发送

export const CODE_CALLBACK_FN: TypeCodeCallbackFn= {
    [CODE_SEND_MESSAGE]: (webview:vscode.WebviewPanel, data: SendMessage )=>{
        //给相应的人发送对应的消息
        // TODO
        sendCardMessageToFeiShu(data).then(res=>{
            webview.dispose();
        });
    },
    [CODE_CANCEL]: (webview:vscode.WebviewPanel,data:SendMessage)=>{
        webview.dispose();
    }

};



//获取当前编辑器配置项
// props: cttq.codereview
function getWorkspaceSetting(props:string):string{
    const setting = vscode.workspace.getConfiguration();
    let result = props.split(".").reduce((pre,curr)=>{
        if(pre) {
            return pre[curr];
        }else {
            return null;
        }
     },setting);
     return result as unknown as string;
}

// 发送消息到飞书机器人 在群里发布检视消息
function sendCardMessageToFeiShu(data:SendMessage){
    let url = getWorkspaceSetting(CODE_REVIEW_CONFIG_PORPS) || URL_SEND_MESSAGE_HTTP;
    return new Promise((resolve,rejects)=>{
        axios.post(url,getSendMessageInfo(TEMPLATE_SEND_MESSAGE,data)).then(res=>{
            resolve(true);
        }).catch(err=>{
            rejects(false);
        });
    });
}


/**
 * 替换发送消息模版信息方法
 *
 *
*/
function getReplaceItem(props: keyof SendMessage){
    return '${'+props+'}';
}

function getSendMessageInfo(template:Object,data:SendMessage){
    const keys = Object.keys(data);
    let templateStr = JSON.stringify(template);
    keys.forEach(item=>{
        templateStr = templateStr.replace(getReplaceItem(item as keyof SendMessage),data[item as keyof SendMessage]);
    });
    return JSON.parse(templateStr);

}



/**
 * 处理当前选中的文件名称和以及当前文件中内容
 *
 * package.json 10-12行
*/
export function formatTextEditorContent(url:vscode.Uri){
    const activeEditor = vscode.window.activeTextEditor;
    let rowInfo = "";
    if(activeEditor){
        let content = activeEditor.selections;
                rowInfo = getRowInfo(content[0].start,content[0].end);
    }
    return `${getCurrActiveEditorUrl(url.path)}：第${rowInfo}行`;

}

//
function getRowInfo(start:vscode.Position,end:vscode.Position){
    return [...new Set([start.line+1,end.line+1])].join("-");
}


// file:///Users/malijia/Desktop/work/other/helloworld-/package.json --> helloworld-/package.json
function getCurrActiveEditorUrl(url:string, deep=2){
    return url.split("/").splice(-1 * deep).join("/");
}




/**
 * 读取当前仓库的git信息
 *
*/

function formatUrlSSHToHTTP(url:string){
    if(isEmpty(url)) {return url;}
    return url.replace(":","/").replace("git@","https://");
}

export function getGitUrlOfWorkspace(){
    // 获取当前工作目录
    let projectRoot= vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : "";
    // 读取.git/HEAD文件，处理分支信息
    let res = fs.readFileSync(projectRoot+"/.git/config");
    if(res) {
        let result = res.toString().match(/url = (\S*)/);
        return result ? formatUrlSSHToHTTP(result[1]) : "";
    }
    return "";
}