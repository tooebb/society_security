/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { BookOpen, ShieldAlert, Activity, AlertTriangle, CheckCircle, XCircle, ChevronRight, Info, Shield, Users, Globe, AlertOctagon, Scale, ExternalLink } from 'lucide-react';

// --- Data ---
const crimeData = [
  { name: '盗窃案 (Theft)', value: 46.44, cases: 2258236 },
  { name: '诈骗案 (Fraud)', value: 29.49, cases: 1433831 },
  { name: '抢劫案 (Robbery)', value: 0.35, cases: 17106 },
  { name: '拐卖妇女儿童案 (Trafficking)', value: 0.09, cases: 4571 },
  { name: '其他 (Others)', value: 23.63, cases: 1148699 },
];

const COLORS = ['#1e3a8a', '#3b82f6', '#93c5fd', '#bfdbfe', '#64748b'];

const diseaseData = [
  { name: '乙类传染病 (Class B)', cases: 2674874, deaths: 2374 },
  { name: '丙类传染病 (Class C)', cases: 2746298, deaths: 5 },
];

const glossaryTerms = [
  { term: "社会治安 (Social Order)", def: "指社会处于一种有秩序、安定的状态，是国家稳定、社会发展和人民群众安居乐业的基本保证。" },
  { term: "群体性事件 (Mass Incidents)", def: "由人民内部矛盾引发、部分群众参与、有一定组织和目的、采取过激方式表达诉求，对社会秩序造成一定影响的事件。" },
  { term: "网络舆情 (Internet Public Opinion)", def: "公众在互联网上对某一焦点问题所表现出的有较强影响力、带有倾向性的言论和观点的总和。" },
  { term: "公共卫生事件 (Public Health Emergencies)", def: "突然发生，造成或者可能造成社会公众健康严重损害的重大传染病疫情、群体性不明原因疾病、重大食物和职业中毒以及其他严重影响公众健康的事件。" }
];

const caseStudies = [
  {
    title: "防范新型电信网络诈骗",
    type: "社会治安",
    description: "近年来，以电信网络诈骗为代表的新型违法犯罪活动高发。犯罪分子利用通讯工具、互联网等技术手段，实施非接触式诈骗，严重危害群众财产安全。",
    action: "国家层面开展了“断卡”行动，推出国家反诈中心APP，构建全民反诈防线，提升群众防骗意识。"
  },
  {
    title: "应对重大突发公共卫生事件",
    type: "公共安全",
    description: "重大传染病疫情等突发公共卫生事件，具有突发性、复杂性和破坏性，直接威胁人民群众生命安全和身体健康，甚至影响国家经济社会发展全局。",
    action: "坚持人民至上、生命至上，建立健全疾病预防控制体系，完善重大疫情防控体制机制。"
  },
  {
    title: "常态化开展扫黑除恶斗争",
    type: "社会治安",
    description: "黑恶势力是社会毒瘤，严重破坏经济社会秩序，侵蚀党的执政根基，人民群众深恶痛绝。",
    action: "党中央决定开展扫黑除恶专项斗争，坚持打早打小、除恶务尽，建立健全扫黑除恶常态化机制，不断增强人民群众获得感、幸福感、安全感。"
  },
  {
    title: "妥善处置群体性事件",
    type: "社会稳定",
    description: "由于利益诉求多元化等原因，部分群众采取过激方式表达诉求，引发群体性事件，影响社会正常秩序。",
    action: "坚持预防为主、调解优先，畅通群众诉求表达渠道，依法妥善处置，防止矛盾激化升级，维护社会大局稳定。"
  }
];

const legalDocuments = [
  {
    author: "全国人民代表大会常务委员会",
    title: "中华人民共和国国家安全法",
    type: "Z",
    year: "2015",
    link: "http://www.npc.gov.cn/npc/c30834/201507/t20150701_19405.html"
  },
  {
    author: "全国人民代表大会常务委员会",
    title: "中华人民共和国治安管理处罚法",
    type: "Z",
    year: "2012",
    link: "http://www.npc.gov.cn/npc/c30834/201210/t20121029_17407.html"
  },
  {
    author: "全国人民代表大会常务委员会",
    title: "中华人民共和国突发事件应对法",
    type: "Z",
    year: "2007",
    link: "http://www.npc.gov.cn/npc/c30834/200708/t20070830_13794.html"
  },
  {
    author: "全国人民代表大会常务委员会",
    title: "中华人民共和国刑法",
    type: "Z",
    year: "2020",
    link: "http://www.npc.gov.cn/npc/c30834/201508/t20150829_19441.html"
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "社会安全是提升人民群众幸福感和满意度的什么？",
    options: ["最终目标", "基本前提", "唯一途径", "附加条件"],
    correctAnswer: 1,
    explanation: "课本指出：社会安全是提升人民群众幸福感和满意度的基本前提。"
  },
  {
    id: 2,
    question: "根据2019年数据，我国公安机关立案的刑事案件中占比最高的是哪一类？",
    options: ["诈骗案", "抢劫案", "盗窃案", "毒品案"],
    correctAnswer: 2,
    explanation: "2019年数据表明，盗窃案占比最高，达46.44%。"
  },
  {
    id: 3,
    question: "以下哪项不属于社会突发公共事件的四大类之一？",
    options: ["自然灾害", "事故灾难", "网络诈骗", "公共卫生事件"],
    correctAnswer: 2,
    explanation: "社会突发公共事件主要包括自然灾害、事故灾难、公共卫生事件和社会安全事件。网络诈骗属于社会治安问题中的新型违法犯罪。"
  },
  {
    id: 4,
    question: "维护社会安全的途径与方法不包括以下哪项？",
    options: ["健全公共安全体系", "放任社会舆情自由发展", "加强反暴力反恐怖斗争", "有效预防和妥善处置群体性事件"],
    correctAnswer: 1,
    explanation: "维护社会安全需要强化社会舆情引导管控，而不是放任其自由发展。"
  },
  {
    id: 5,
    question: "在应对突发公共卫生事件时，我国坚持的根本原则是？",
    options: ["经济利益优先", "人民至上、生命至上", "顺其自然", "仅依靠国际援助"],
    correctAnswer: 1,
    explanation: "在应对重大公共卫生事件时，我国始终坚持人民至上、生命至上的原则，把人民生命安全和身体健康放在第一位。"
  },
  {
    id: 6,
    question: "当前，哪类犯罪在我国刑事案件中占比最高，成为影响群众安全感的突出问题？",
    options: ["暴力杀人案", "侵财类犯罪（如盗窃、诈骗）", "毒品犯罪", "走私犯罪"],
    correctAnswer: 1,
    explanation: "数据表明，盗窃案和诈骗案等侵财类犯罪占比极高（合计超75%），是当前防范的重点。"
  }
];

// --- Components ---

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center space-x-3 mb-6 pb-2 border-b-2 border-slate-200">
    <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
      <Icon size={24} />
    </div>
    <h2 className="text-2xl font-serif font-semibold text-slate-800 tracking-wide">{title}</h2>
  </div>
);

const StatCard = ({ title, value, unit, subtitle }: { title: string, value: string, unit: string, subtitle?: string }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-sm font-medium text-slate-500 mb-2">{title}</h3>
    <div className="flex items-baseline space-x-1">
      <span className="text-3xl font-bold text-slate-800">{value}</span>
      <span className="text-sm text-slate-500">{unit}</span>
    </div>
    {subtitle && <p className="text-xs text-slate-400 mt-2">{subtitle}</p>}
  </div>
);

export default function App() {
  const [quizState, setQuizState] = useState<{ [key: number]: number | null }>({});

  const handleOptionSelect = (qId: number, oIdx: number) => {
    if (quizState[qId] !== undefined) return;
    setQuizState(prev => ({ ...prev, [qId]: oIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizState[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const allAnswered = Object.keys(quizState).length === quizQuestions.length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-2 text-blue-700 mb-3">
            <Shield size={20} />
            <span className="font-semibold tracking-wider text-sm uppercase">国家安全教育 (National Security Education)</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">第九章：社会安全</h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            社会安全是国家安全的重要内容，是国家改革发展的重要保障，也是提升人民群众幸福感和满意度的基本前提。本模块基于教材内容，深度解析社会安全的核心要素。
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        
        {/* 主要内容 Section */}
        <section>
          <SectionHeader title="主要内容 (Main Content)" icon={BookOpen} />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Users className="text-blue-600 mb-4" size={28} />
              <h4 className="text-lg font-semibold text-slate-900 mb-3">社会治安</h4>
              <p className="text-sm text-slate-600 leading-relaxed">包括暴力犯罪、侵财犯罪、网络犯罪、毒品犯罪和黑恶势力犯罪等。良好的治安是社会稳定的基石。</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <AlertTriangle className="text-orange-600 mb-4" size={28} />
              <h4 className="text-lg font-semibold text-slate-900 mb-3">社会突发公共事件</h4>
              <p className="text-sm text-slate-600 leading-relaxed">主要分为四大类：自然灾害、事故灾难、公共卫生事件（如传染病疫情）和社会安全事件。</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <Globe className="text-indigo-600 mb-4" size={28} />
              <h4 className="text-lg font-semibold text-slate-900 mb-3">社会舆情</h4>
              <p className="text-sm text-slate-600 leading-relaxed">随着互联网普及，网络舆情成为社会舆情的重要组成部分。防范网络水军和不良信息传播至关重要。</p>
            </div>
          </div>
        </section>

        {/* Glossary Section */}
        <section>
          <SectionHeader title="核心概念解析 (Key Concepts)" icon={BookOpen} />
          <div className="grid md:grid-cols-2 gap-4">
            {glossaryTerms.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                <h4 className="font-semibold text-blue-800 mb-2">{item.term}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data Visualization Section */}
        <section>
          <SectionHeader title="数据洞察 (Data Insights)" icon={Activity} />
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Chart 1: Crime Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800">2019年全国刑事案件构成</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <Info size={12} className="mr-1" /> 数据来源：
                  <a href="https://www.stats.gov.cn/sj/ndsj/2020/indexch.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center ml-1">
                    2020年《中国统计年鉴》<ExternalLink size={10} className="ml-1" />
                  </a>
                </p>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={crimeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {crimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => [
                        `${value}% (${props.payload.cases.toLocaleString()}件)`, 
                        name
                      ]}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm text-slate-600 border border-slate-100">
                <span className="font-semibold text-slate-800">解析：</span> 侵财类犯罪（盗窃、诈骗）占据了绝大比例，合计超过75%，反映出当前社会治安防范的重点领域。
              </div>
            </div>

            {/* Chart 2: Infectious Diseases */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800">2020年全国法定传染病疫情概况</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <Info size={12} className="mr-1" /> 数据来源：
                  <a href="http://www.nhc.gov.cn/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center ml-1">
                    国家卫健委统计数据<ExternalLink size={10} className="ml-1" />
                  </a>
                </p>
              </div>
              <div className="h-[200px] w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={diseaseData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fill: '#475569' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: '#f1f5f9' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="cases" name="发病数 (Cases)" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="text-xs text-blue-600 font-medium mb-1">总发病数</div>
                  <div className="text-2xl font-bold text-blue-900">5,421,172</div>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="text-xs text-red-600 font-medium mb-1">总死亡数</div>
                  <div className="text-2xl font-bold text-red-900">2,379</div>
                </div>
              </div>
            </div>
          </div>

          {/* Natural Disasters Stats */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800">2020年一季度全国自然灾害受灾情况</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center">
                <Info size={12} className="mr-1" /> 数据来源：
                <a href="https://www.mem.gov.cn/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center ml-1">
                  应急管理部发布<ExternalLink size={10} className="ml-1" />
                </a>
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="受灾人次" value="504.8" unit="万" />
              <StatCard title="紧急转移安置" value="2.4" unit="万" />
              <StatCard title="房屋损坏" value="13.3" unit="万间" subtitle="含倒塌1100余间" />
              <StatCard title="直接经济损失" value="43.4" unit="亿元" />
            </div>
          </div>
        </section>

        {/* 威胁与挑战 Section */}
        <section>
          <SectionHeader title="面临的威胁与挑战 (Threats & Challenges)" icon={AlertOctagon} />
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <ul className="grid md:grid-cols-2 gap-4">
              {[
                "社会群体性事件时常发生，影响局部稳定。",
                "社会治安问题和新型违法犯罪增多（如电信网络诈骗）。",
                "暴力恐怖活动事件时有发生，严重威胁生命财产安全。",
                "境外敌对势力的渗透、破坏日益严重。",
                "社会舆情依然严峻复杂，网络空间治理面临挑战。"
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-slate-700 bg-red-50/50 p-4 rounded-xl border border-red-100">
                  <XCircle className="text-red-500 mt-0.5 shrink-0" size={20} />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 途径与方法 Section */}
        <section>
          <SectionHeader title="维护途径与方法 (Methods & Approaches)" icon={ShieldAlert} />
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "有效预防和妥善处置群体性事件",
                "健全公共安全体系",
                "加强处理社会治安问题的能力",
                "加强反暴力反恐怖斗争",
                "防范、制止和依法惩治民族分裂活动和非法宗教的渗透",
                "强化社会舆情引导管控"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <CheckCircle className="text-blue-600 shrink-0" size={20} />
                  <span className="text-sm font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section>
          <SectionHeader title="典型案例分析 (Case Studies)" icon={Shield} />
          <div className="space-y-6">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className="bg-slate-50 p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full w-max mb-3">
                    {study.type}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800">{study.title}</h3>
                </div>
                <div className="p-6 md:w-2/3 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 mb-1">背景与危害</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{study.description}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="text-sm font-semibold text-blue-800 mb-1 flex items-center">
                      <ShieldAlert size={14} className="mr-1" /> 应对措施
                    </h4>
                    <p className="text-blue-900 text-sm leading-relaxed">{study.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-2">知识自测 (Knowledge Quiz)</h2>
                <p className="text-slate-400">检验你对社会安全知识的掌握程度</p>
              </div>
              <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm">
                <BookOpen size={28} className="text-blue-400" />
              </div>
            </div>

            <div className="space-y-8">
              {quizQuestions.map((q, idx) => (
                <div key={q.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-medium mb-4 flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold mr-3 shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    {q.question}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {q.options.map((opt, oIdx) => {
                      const hasAnswered = quizState[q.id] !== undefined;
                      const isSelected = quizState[q.id] === oIdx;
                      const isCorrect = q.correctAnswer === oIdx;
                      
                      let btnClass = "text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm ";
                      
                      if (!hasAnswered) {
                        btnClass += "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300";
                      } else {
                        if (isCorrect) {
                          btnClass += "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
                        } else if (isSelected && !isCorrect) {
                          btnClass += "bg-red-500/20 border-red-500/50 text-red-300";
                        } else {
                          btnClass += "bg-white/5 border-white/10 text-slate-500 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleOptionSelect(q.id, oIdx)}
                          disabled={hasAnswered}
                          className={btnClass}
                        >
                          <div className="flex items-center justify-between">
                            <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                            {hasAnswered && isCorrect && <CheckCircle size={16} className="text-emerald-400" />}
                            {hasAnswered && isSelected && !isCorrect && <XCircle size={16} className="text-red-400" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  {quizState[q.id] !== undefined && (
                    <div className={`mt-4 p-4 rounded-xl text-sm ${quizState[q.id] === q.correctAnswer ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-200 border border-blue-500/20'}`}>
                      <span className="font-semibold mr-2">解析:</span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-8">
              {allAnswered ? (
                <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                  <div className="text-xl mb-4 sm:mb-0">
                    你的得分: <span className="font-bold text-3xl text-blue-400 ml-2">{calculateScore()}</span> / {quizQuestions.length}
                  </div>
                  <button
                    onClick={() => setQuizState({})}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                  >
                    重新测试
                  </button>
                </div>
              ) : (
                <div className="text-slate-400 text-sm">
                  已答 {Object.keys(quizState).length} / {quizQuestions.length} 题
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 参考文献 Section */}
        <section className="pt-8 border-t border-slate-200">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen size={18} className="text-slate-500" />
            <h3 className="text-lg font-serif font-semibold text-slate-700">参考法律文献 (Legal References)</h3>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 font-serif leading-relaxed">
            {legalDocuments.map((doc, idx) => (
              <li key={idx} className="pl-2 marker:text-slate-400">
                {doc.author}. {doc.title}[{doc.type}]. {doc.year}. 
                <a href={doc.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline inline-flex items-center">
                  [在线阅读] <ExternalLink size={10} className="ml-0.5" />
                </a>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center text-sm">
        <p>本页面内容基于《国家安全教育》第九章：社会安全 制作。</p>
        <p className="mt-1 opacity-60">数据来源：2020年《中国统计年鉴》、国家卫健委、应急管理部等公开资料。</p>
      </footer>
    </div>
  );
}
