import * as vscode from "vscode";


export interface SendMessage {
    file: string,
    gitUrl: string,
    title: string,
    suggestion: string,
    type: string,
    userCode: string,
    reviewer: string
}

// 发送事件类型枚举值
export enum CodeType {
    "confirm" = "CONFIRM",
    "cancel"="CANCEL"
}

// 发送消息 事件类型 函数对象
export type TypeCodeCallbackFn = {
    [p in CodeType]?: (panel:vscode.WebviewPanel,data:SendMessage)=>void
};

// 定义发送的消息类型
export type TypeSendMessage = {
    code?: keyof typeof CodeType,
    value?: string
};