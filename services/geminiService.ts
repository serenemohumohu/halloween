
import { GoogleGenAI, Type } from "@google/genai";
import { Story, StoryParams } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const storySchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "物語のための、短く、キャッチーで不気味なタイトル。"
        },
        content: {
            type: Type.STRING,
            description: "ハロウィーン物語の全文。約200～300文字程度で。"
        }
    },
    required: ["title", "content"]
};


export const generateStory = async (params: StoryParams): Promise<Story> => {
    const { mood, character, setting } = params;

    const prompt = `
        洗練された現代の読者に向けた、短く不気味なハロウィーンの物語（約200～300文字程度）を作成してください。
        物語は、残虐な表現や子供っぽさを避け、雰囲気がありゾッとするようなものにしてください。
        以下の要素を取り入れてください：
        - 雰囲気: ${mood}
        - 主人公: ${character}
        - 舞台: ${setting}

        明確な始まり、中間、そしてサスペンスに満ちた、あるいは驚きのある結末を持つ、魅力的な物語を生成してください。
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.9,
                topP: 0.95,
                topK: 64,
                responseMimeType: "application/json",
                responseSchema: storySchema,
            },
        });

        const jsonString = response.text.trim();
        const storyData: Story = JSON.parse(jsonString);
        
        if (!storyData.title || !storyData.content) {
            throw new Error("AIから無効な形式の物語が返されました。");
        }

        return storyData;

    } catch (error) {
        console.error("Error generating story with Gemini:", error);
        throw new Error("霊魂から物語を呼び出すのに失敗しました。");
    }
};
