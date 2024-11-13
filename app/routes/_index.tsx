import { json, type LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { createAppContext } from "../context";
import { AppError } from "../utils/error";
import { Link } from "@remix-run/react";

export const loader: LoaderFunction = async ({ context }) => {
  console.log("Loader started");
  const appContext = createAppContext(context);
  const { imageGenerationService, config } = appContext;

  let cfAiStatus = "未连接";
  let configStatus = {
    API_KEY: config.API_KEY ? "已设置" : "未设置",
    CF_TRANSLATE_MODEL: config.CF_TRANSLATE_MODEL,
    CF_ACCOUNT_LIST: config.CF_ACCOUNT_LIST.length > 0 ? "已设置" : "未设置",
    CUSTOMER_MODEL_MAP: Object.keys(config.CUSTOMER_MODEL_MAP).length > 0 ? "已设置" : "未设置",
  };

  try {
    await imageGenerationService.testCfAiConnection();
    cfAiStatus = "已连接";
  } catch (error) {
    console.error("CF AI 连接测试失败:", error);
    cfAiStatus = error instanceof AppError ? `连接失败: ${error.message}` : "连接失败: 未知错误";
  }

  console.log("Loader completed");
  return json({ cfAiStatus, configStatus });
};

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-black mb-8 text-center">Satiの小破站</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/generate-image"
                className="block w-full text-center px-6 py-3 text-lg font-semibold text-black bg-gradient-to-r from-pink-300 to-white rounded-xl transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                AI绘图 少女绘画中~
                </Link>
              </li>
            <li>
              <Link
                to="https://proxy.jizixi.com/https://duckduckgo.com/chat"
                className="block w-full text-center px-6 py-3 text-lg font-semibold text-black bg-gradient-to-r from-Crimson-300 to-white rounded-xl transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                达达鸭AI 少女の推荐~
                </Link>
              </li>
            <li>
              <Link
                to="https://bpb.jizixi.com/panel"
                className="block w-full text-center px-6 py-3 text-lg font-semibold text-black bg-gradient-to-r from-purple-300 to-white rounded-xl transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                少女の魔法~
              </Link>
              </li>
            <li>
              <Link
                to="https://playground.ai.cloudflare.com/"
                className="block w-full text-center px-6 py-3 text-lg font-semibold text-black bg-gradient-to-r from-violet-300 to-white rounded-xl transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                大善人のAI大模型~
              </Link>
              </li>
            <li>
              <Link
                to="https://bt.jizixi.com/"
                className="block w-full text-center px-6 py-3 text-lg font-semibold text-black bg-gradient-to-r from-blue-300 to-white rounded-xl transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                Satiの磁力搜索~
              </Link>
              </li>
            <li>
              <Link
                to="https://bendan.jizixi.com/"
                className="block w-full text-center px-6 py-3 text-lg font-semibold text-black bg-gradient-to-r from-red-300 to-white rounded-xl transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                Satiの笨蛋AI~
              </Link>
            </li>
            {/* 可以在这里添加更多的导航项 */}
          </ul>
        </nav>
      </div>
    </div>
  );
}
