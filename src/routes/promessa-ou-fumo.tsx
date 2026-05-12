import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/promessa-ou-fumo")({
  head: () => ({
    meta: [
      { title: "Promessa ou Fumo? — PoliTrace" },
      { name: "description", content: "Classificador documental de frases políticas." },
    ],
  }),
  component: Page,
});

interface Result {
  label: string;
  detail: string;
  confidence: number;
  signals: string[];
}

function classify(text: string): Result {
  const t = text.toLowerCase();
  const signals: string[] = [];

  const numbers =
    /\b\d+([.,]\d+)?\s*(%|mil|milhões|milhoes|mil milhões|euros|€|fogos|profissionais|km|gw|mw|pontos)?\b/.test(
      t,
    );
  const deadline =
    /(até|antes de|durante|primeiro ano|primeiros? \w+ anos?|legislatura|mandato|202\d|203\d)/.test(
      t,
    );
  const legislative =
    /(lei|decreto|revisão|revisao|legislar|alterar|aprovar|projecto de lei|projeto de lei)/.test(t);
  const budget = /(orçamento|orcamento|investir|investimento|verba|dotação|dotacao|pib)/.test(t);
  const vague =
    /(apostar|reforçar|reforcar|defender|promover|valorizar|melhorar|garantir uma|uma sociedade|um país|um pais)/.test(
      t,
    );
  const ideological =
    /(soberania|liberdade|justiça social|justica social|tradição|tradicao|identidade|patriotismo|igualdade)/.test(
      t,
    );
  const rhetoric =
    /(é tempo de|é hora de|hoje mais do que nunca|com coragem|de mãos dadas|virar a página)/.test(
      t,
    );

  if (numbers) signals.push("contém número/quantificação");
  if (deadline) signals.push("contém referência temporal/prazo");
  if (legislative) signals.push("vocabulário legislativo");
  if (budget) signals.push("vocabulário orçamental");
  if (vague) signals.push("verbo programático vago");
  if (ideological) signals.push("conteúdo ideológico");
  if (rhetoric) signals.push("estrutura retórica");

  if (numbers && deadline)
    return {
      label: "Proposta mensurável com prazo",
      detail: "Contém quantificação e janela temporal — promessa concreta e auditável.",
      confidence: 0.9,
      signals,
    };
  if (numbers)
    return {
      label: "Proposta mensurável",
      detail: "Contém quantificação mas não fixa prazo explícito.",
      confidence: 0.78,
      signals,
    };
  if (deadline && (legislative || budget))
    return {
      label: "Compromisso com prazo",
      detail: "Compromisso institucional com janela temporal definida.",
      confidence: 0.74,
      signals,
    };
  if (legislative || budget)
    return {
      label: "Promessa institucional/legislativa",
      detail: "Compromisso de ação institucional sem métrica explícita.",
      confidence: 0.6,
      signals,
    };
  if (rhetoric && !vague && !ideological)
    return {
      label: "Frase retórica",
      detail: "Estrutura discursiva sem operacionalização.",
      confidence: 0.7,
      signals,
    };
  if (ideological)
    return {
      label: "Valor ideológico",
      detail: "Afirmação de valor — não operacionalizável como promessa concreta.",
      confidence: 0.72,
      signals,
    };
  if (vague)
    return {
      label: "Promessa vaga",
      detail: "Intenção programática sem métrica, prazo ou instrumento concreto.",
      confidence: 0.68,
      signals,
    };
  return {
    label: "Indeterminada",
    detail: "Sinais insuficientes para classificação automática.",
    confidence: 0.3,
    signals,
  };
}

const examples = [
  "Vamos contratar 5 000 profissionais de saúde até 2025.",
  "Apostar fortemente numa transição energética justa.",
  "É tempo de virar a página e construir um país melhor.",
  "Apresentaremos uma revisão da Lei de Bases da Educação.",
];

function Page() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  function run(t: string) {
    setText(t);
    setResult(t.trim().length > 4 ? classify(t) : null);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
        Ferramenta heurística
      </div>
      <h1 className="font-display text-4xl font-semibold mt-2">Promessa ou Fumo?</h1>
      <p className="text-muted-foreground mt-2">
        Insira uma frase política. O sistema indica, de forma documental e prudente, se se trata de
        uma promessa concreta, vaga, ideológica, retórica, mensurável ou com prazo.
      </p>

      <textarea
        value={text}
        onChange={(e) => run(e.target.value)}
        rows={4}
        placeholder="Cole aqui uma frase de um programa, discurso ou comunicado…"
        className="mt-6 w-full px-4 py-3 border border-border bg-card rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="flex flex-wrap gap-2 mt-3">
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => run(ex)}
            className="text-xs px-2.5 py-1 rounded-full border border-border bg-card hover:bg-secondary"
          >
            {ex.slice(0, 40)}…
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-8 border border-rule bg-card rounded-lg p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Classificação
          </div>
          <h2 className="font-display text-2xl font-semibold mt-1">{result.label}</h2>
          <p className="text-muted-foreground mt-2">{result.detail}</p>
          <div className="mt-4">
            <div className="text-xs text-muted-foreground mb-1">
              Confiança heurística: {(result.confidence * 100).toFixed(0)}%
            </div>
            <div className="h-2 bg-secondary rounded">
              <div
                className="h-2 bg-primary rounded"
                style={{ width: `${result.confidence * 100}%` }}
              />
            </div>
          </div>
          {result.signals.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {result.signals.map((s) => (
                <li key={s} className="text-xs px-2 py-0.5 border border-border bg-paper rounded">
                  {s}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-6 text-xs text-muted-foreground italic border-t border-rule pt-3">
            Esta classificação é heurística e documental. Não constitui juízo de valor sobre o
            emissor nem recomendação de voto. Revisão humana é sempre recomendada.
          </p>
        </div>
      )}
    </div>
  );
}
