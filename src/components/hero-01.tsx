"use client";

import { GradientMesh } from "@/components/gradient-mesh";
import { Button } from "@/components/ui/button";
import { WordRotate } from "@/components/ui/word-rotate";

interface Hero01Props {
  onContactClick?: () => void;
}

export default function Hero01({ onContactClick }: Hero01Props) {
  return (
    <div className="min-h-screen flex items-center justify-center relative py-20">
      <GradientMesh
        colors={["#e8f5e9", "#60f823", "#61d58a"]}
        distortion={5}
        swirl={0.5}
        speed={0.8}
        scale={1.0}
        waveAmp={0.08}
        waveFreq={10}
        waveSpeed={0.2}
        grain={0.04}
      />
      <div className="flex flex-col text-center z-10 px-4">
        <h2 className="font-extrabold text-black mix-blend-overlay tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          AI-автоматизация, <br /> которая{" "}
          <span className="text-black">
            <WordRotate
              className="inline-block"
              words={["ускоряет бизнес", "снижает издержки", "усиливает продажи", "экономит время"]}
            />
          </span>
        </h2>
        <div className="space-y-6 z-10 pt-12 md:pt-20 flex justify-center items-center flex-col text-center px-6">
          <p className="text-black w-full max-w-lg font-light text-sm md:text-xl">
            Выстраиваем процессы, убираем рутину, усиливаем отделы продаж и сервис. Без хаоса, без лишних слов.
          </p>
          <div className="flex gap-3 mt-6 flex-wrap justify-center">
            <Button
              onClick={onContactClick}
              className="h-12 md:h-14 rounded-full cursor-pointer px-8 md:px-10 bg-black hover:bg-neutral-800 text-white border-2 border-black shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.2),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.15),0_0_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_8px_rgba(0,0,0,0.05),0_2px_8px_rgba(0,0,0,0.1),0_0_16px_rgba(0,0,0,0.4)]"
            >
              Записаться на разбор
            </Button>
            <Button
              variant={"secondary"}
              className="h-12 md:h-14 cursor-pointer rounded-full px-8 md:px-10 border-2 border-black bg-white text-black hover:bg-neutral-50"
            >
              Посмотреть примеры
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
