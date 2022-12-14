import fetch from "node-fetch";
import { config } from "../config";

export async function getStudentInfoById(id: number) {
  const resp = await fetch(
    `http://106.15.2.32:1337/api/forms?filters[studentId][$eq]=${id}`,
    {
      headers: {
        Authorization: "Bearer " + config.userApiToken,
      },
    },
  );
  const { data } = await resp.json();
  if (data.length === 0) return null;
  const { attributes } = data[data.length - 1];
  return attributes;
}

export function sendLarkMessage(text: string) {
  if (!config.larkWebhook) return;
  fetch(config.larkWebhook, {
    method: "post",
    body: JSON.stringify({
      "msg_type": "text",
      "content": {
        "text": text,
      },
    }),
    headers: { "Content-Type": "application/json" },
  }).catch((err) => {
    console.error("[lark]", err);
  });
}
