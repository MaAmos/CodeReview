/**
 *  存放常量信息
 *
 * */


// 自定义Code Review 命令
export const CODE_REVIEW_COMMAND = "CodeReview.CodeReview";

// 增加Code Review意见标题
export const CODE_REVIEW_TITLE = "Add Code Review Note";

// 设置当前代码review web view 的标识
export const WEBVIEW_KEY_CODE_REVIEW = "codeReviewWebview";

// 设置web view的一些静态参数
export const BAISC_CONFIG_CREATE_WEBVIEW = [WEBVIEW_KEY_CODE_REVIEW,CODE_REVIEW_TITLE];

// 没有路径时提示信息
export const INFO_NO_URI_MESSAGE = "请右击侧边栏文件选择Code Review 或者 选择文件内容后右击选择Code Review，请勿直接使用该命令";

// 读取的HTML的文件路径
export const URL_WEBVIEW_HTML = "dist/src/template/index.html";

// 配置消息机器人发送消息接口地址
export const URL_SEND_MESSAGE_HTTP = "https://open.feishu.cn/open-apis/bot/v2/hook/2e99e81a-7a3c-4e62-9c83-100f76b76744";

// 编辑器参数配置
export const CODE_REVIEW_CONFIG_PORPS = "cttq.codereview.url";

// 发送的卡片信息的模版数据
export const TEMPLATE_SEND_MESSAGE = {
    "msg_type":"interactive",
    "card": {
      "header": {
        "title": {
          "tag": "plain_text",
          "content": "${title}"
        },
        "template": "${type}"
      },
      "elements": [
        {
          "tag": "div",
          "text": {
            "tag": "lark_md",
            "content": "**${file}**"
          }
        },
        {
          "tag": "div",
          "text": {
            "tag": "lark_md",
            "content": "**${reivewer}的检视意见：**\n${suggestion}  ｜ **<at user_id=''>@${userCode}</at>** "
          }
        },
        {
          "tag": "action",
          "actions": [
            {
              "tag": "button",
              "text": {
                "tag": "plain_text",
                "content": "立即查看",
              },
              "type": "primary",
              "url": "${gitUrl}"
            }
          ]
        }
      ]
    }
};

