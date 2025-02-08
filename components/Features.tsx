import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { title: "高速", description: "Next.js + Turbopackで超高速表示" },
  { title: "柔軟", description: "コンポーネントベースで簡単拡張" },
  { title: "モダン", description: "最新技術を活用した開発環境" },
];

export default function Features() {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">特徴</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
