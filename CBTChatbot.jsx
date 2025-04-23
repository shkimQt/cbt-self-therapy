
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CBTChatbot() {
  const [step, setStep] = useState(1);
  const [entries, setEntries] = useState({
    A: "",
    B: "",
    C: "",
    D: ""
  });
  const [response, setResponse] = useState("");

  const handleChange = (field, value) => {
    setEntries(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    const distortions = {
      "최악 인식": /최악|절대 안 돼|끝이야/,
      "이분법 사고": /항상|절대|완전히/,
      "감정적 추론": /느껴서 그런 거야|느낌이 그래/,
      "부정적 확대": /아무것도 못 해|다 잘못됐어/,
      "긍정 최소화": /그냥 위로였어|별거 아냐/,
      "결론 도약": /분명 싫어해|틀림없어/,
      "미래 예언": /망할 거야|실패할 거야/,
      "독심술": /생각이 뻔해|말 안 해도 알아/,
      "자기 비난": /내 탓이야|내가 문제야/,
      "타인 비난": /다 너 때문이야/,
      "긍정 걸러냄": /좋은 일 없어|별로였어/,
      "일반화": /다 그래|항상 그래/,
      "딱지 붙이기": /난 바보야|난 루저야/,
      "당위적 사고": /그래야 했어|했어야 했는데/
    };

    const matched = Object.entries(distortions).filter(([_, regex]) => regex.test(entries.B));
    const distortionList = matched.map(([type]) => `- ${type}`).join("\n");

    const actResponse = `"나는 지금 이렇게 느끼는구나. 하지만 괜찮아. 지금 생각과는 다르게 생각하고 행동할 수 있어."`;
    const dbtResponse = `"물론 내 생각이 맞을 수도 있지만, 이렇게 생각할 수도 있지 않을까?"`;

    const customD = `ACT 대안 신념: ${actResponse}\nDBT 대안 신념: ${dbtResponse}`;

    setResponse(
      `🧠 자동적 사고 분석 결과\n${distortionList || "명확한 인지 왜곡 유형이 감지되지 않았어요."}\n\n${customD}`
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">CBT 자가 치료 도구</h1>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div>
            <label className="font-semibold">A – 사건:</label>
            <Textarea value={entries.A} onChange={e => handleChange("A", e.target.value)} />
          </div>
          <div>
            <label className="font-semibold">B – 자동적 생각:</label>
            <Textarea value={entries.B} onChange={e => handleChange("B", e.target.value)} />
          </div>
          <div>
            <label className="font-semibold">C – 감정/행동:</label>
            <Textarea value={entries.C} onChange={e => handleChange("C", e.target.value)} />
          </div>
          <Button onClick={handleGenerate}>대안 신념 도출하기</Button>
          {response && (
            <div className="bg-gray-100 p-3 rounded-lg whitespace-pre-wrap">{response}</div>
          )}
          <div>
            <label className="font-semibold">D – 내가 생각해본 대안 신념:</label>
            <Textarea value={entries.D} onChange={e => handleChange("D", e.target.value)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
