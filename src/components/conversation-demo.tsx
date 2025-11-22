"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ui/conversation"
import { Orb } from "@/components/ui/orb"

export default function ConversationDemo() {
  // Демонстрационные сообщения
  const demoMessages = [
    {
      role: "user" as const,
      content: "Как AI может помочь автоматизировать продажи?",
      time: "10:30"
    },
    {
      role: "assistant" as const,
      content: "AI-агенты могут автоматизировать множество процессов в продажах: квалификацию лидов, обработку входящих запросов, напоминания менеджерам, анализ звонков и многое другое. Это позволяет увеличить конверсию на 15-30%.",
      time: "10:31"
    },
    {
      role: "user" as const,
      content: "А какие интеграции поддерживаются?",
      time: "10:32"
    },
    {
      role: "assistant" as const,
      content: "Мы интегрируем с YClients, VK, Telegram, WhatsApp, различными CRM-системами и Google Sheets. Все данные синхронизированы в реальном времени.",
      time: "10:33"
    },
  ]

  return (
    <div className="relative mx-auto h-[600px] w-full">
      <Card className="flex h-full w-full flex-col gap-0 overflow-hidden border-none shadow-none">
        <CardContent className="relative flex-1 overflow-hidden p-0">
          <Conversation>
            <ConversationContent className="flex min-w-0 flex-col gap-4 p-6">
              {demoMessages.length === 0 ? (
                <ConversationEmptyState
                  icon={<Orb className="size-12" colors={["#ABFF00", "#82bf04"]} />}
                  title="Начните диалог с AI-агентом"
                  description="Пример того, как выглядит общение с нашими AI-агентами"
                />
              ) : (
                demoMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.role === "user"
                          ? "bg-[#ABFF00] text-black"
                          : "bg-neutral-100 text-black"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {message.role === "assistant" && (
                          <div className="size-8 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#ABFF00]">
                            <Orb className="h-full w-full" colors={["#ABFF00", "#82bf04"]} />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                          <span className="text-xs text-neutral-600 mt-2 block">
                            {message.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </CardContent>
      </Card>
    </div>
  )
}
