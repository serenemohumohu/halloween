
import React, { useState } from 'react';
import { StoryParams } from '../types';

interface StoryInputFormProps {
  onSubmit: (params: StoryParams) => void;
}

const moods = ["不気味", "サスペンス", "ミステリアス", "ゴシック", "超現実的"];
const characters = ["迷子の旅人", "懐疑的な科学者", "好奇心旺盛な子供", "悲嘆に暮れる芸術家", "骨董品収集家"];
const settings = ["廃墟のカーニバル", "霧に包まれたヴィクトリア朝の屋敷", "忘れられた図書館", "月明かりのトウモロコシ畑", "古代の地下聖堂"];

const StoryInputForm: React.FC<StoryInputFormProps> = ({ onSubmit }) => {
  const [mood, setMood] = useState<string>(moods[0]);
  const [character, setCharacter] = useState<string>(characters[0]);
  const [setting, setSetting] = useState<string>(settings[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ mood, character, setting });
  };

  const inputClass = "w-full bg-black/30 border border-spooky-purple/50 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-spooky-orange focus:border-transparent outline-none transition-all duration-300 appearance-none";
  const labelClass = "block text-spooky-orange text-sm font-bold mb-2 uppercase tracking-wider";

  return (
    <div className="animate-fade-in bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-spooky-purple/30 shadow-2xl shadow-spooky-purple/10">
      <div className="text-center mb-6">
        <h1 className="font-creepster text-5xl md:text-7xl text-spooky-orange text-glow">
          Spirit Storyteller
        </h1>
        <p className="text-gray-400 mt-2">あの世から物語を召喚しましょう。</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="mood" className={labelClass}>
            雰囲気を選ぶ
          </label>
          <select id="mood" value={mood} onChange={(e) => setMood(e.target.value)} className={inputClass}>
            {moods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="character" className={labelClass}>
            登場人物を選ぶ
          </label>
          <select id="character" value={character} onChange={(e) => setCharacter(e.target.value)} className={inputClass}>
             {characters.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="setting" className={labelClass}>
            舞台を選ぶ
          </label>
          <select id="setting" value={setting} onChange={(e) => setSetting(e.target.value)} className={inputClass}>
             {settings.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-3 px-6 bg-spooky-orange text-deep-black font-bold text-lg rounded-lg shadow-lg hover:bg-orange-400 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-spooky-orange focus:ring-offset-2 focus:ring-offset-deep-black animate-pulse-glow"
        >
          物語を召喚
        </button>
      </form>
    </div>
  );
};

export default StoryInputForm;
