"use client";

import * as React from "react";
import { Oswald } from "next/font/google";
import { Header } from "@/components/header";
import Hero01 from "@/components/hero-01";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Orb } from "@/components/ui/orb";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Ripple } from "@/components/ui/ripple";
import { AnimatedList } from "@/components/ui/animated-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, ArrowRight } from "@aliimam/icons";
import { cn } from "@/lib/utils";

const oswald = Oswald({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      telegram: formData.get('telegram'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        e.currentTarget.reset();
      } else {
        setSubmitMessage('❌ Произошла ошибка. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('❌ Произошла ошибка. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-black">
      <Header />

      {/* Hero Section */}
      <Hero01 onContactClick={scrollToContact} />

      {/* AI Voice & Audio Section */}
      <section className="relative mx-auto max-w-[1340px] px-8 py-32 md:px-16 lg:px-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Orb Visualization */}
          <div className="relative h-[400px] lg:h-[500px] overflow-hidden bg-neutral-50 rounded-2xl">
            <Orb
              colors={["#000000", "#404040"]}
              agentState="talking"
              className="h-full w-full"
            />
            <Ripple mainCircleSize={210} numCircles={3} />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-[52px]">
              AI-анализ звонков и голосовые агенты
            </h2>
            <p className="text-lg leading-relaxed text-neutral-700">
              Транскрибация, распознавание намерений, автоматическая обработка диалогов.
              ElevenLabs, Whisper, собственные модели.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold tracking-tight text-primary">
                  <NumberTicker value={98} />%
                </div>
                <p className="text-sm text-neutral-600">Точность распознавания</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold tracking-tight text-primary">
                  <NumberTicker value={15} />сек
                </div>
                <p className="text-sm text-neutral-600">Время обработки</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold tracking-tight text-primary">
                  <NumberTicker value={24} />/7
                </div>
                <p className="text-sm text-neutral-600">Работа без перерывов</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Chat & Messaging Section */}
      <section className="relative mx-auto max-w-[1340px] px-8 py-32 md:px-16 lg:px-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-[52px]">
              Умная работа с чатами и сообщениями
            </h2>
            <p className="text-lg leading-relaxed text-neutral-700">
              Автоматическая обработка входящих сообщений, классификация запросов,
              интеллектуальная маршрутизация. VK, Telegram, WhatsApp — всё в одной системе.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold tracking-tight text-primary">
                  <NumberTicker value={92} />%
                </div>
                <p className="text-sm text-neutral-600">Автоответов в срок</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold tracking-tight text-primary">
                  <NumberTicker value={5} />сек
                </div>
                <p className="text-sm text-neutral-600">Среднее время ответа</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold tracking-tight text-primary">
                  <NumberTicker value={8} />+
                </div>
                <p className="text-sm text-neutral-600">Мессенджеров</p>
              </div>
            </div>
          </div>

          {/* Animated Messages List */}
          <div className="relative h-[500px] lg:h-[600px] overflow-hidden bg-neutral-50 rounded-2xl">
            <AnimatedList
              stackGap={20}
              columnGap={85}
              scaleFactor={0.05}
              scrollDownDuration={5}
              formationDuration={1}
            >
              {[
                { name: "VK", message: "Новый заказ на услугу", time: "2м назад" },
                { name: "Telegram", message: "Вопрос по интеграции", time: "5м назад" },
                { name: "WhatsApp", message: "Запрос на консультацию", time: "12м назад" },
                { name: "Email", message: "Письмо от клиента", time: "15м назад" },
                { name: "VK", message: "Готов к оплате", time: "18м назад" },
                { name: "Telegram", message: "Нужна помощь с настройкой", time: "25м назад" },
                { name: "WhatsApp", message: "Когда можно встретиться?", time: "32м назад" },
                { name: "Email", message: "Предложение о партнёрстве", time: "1ч назад" },
                { name: "VK", message: "Отзыв о работе", time: "2ч назад" },
                { name: "Telegram", message: "Хочу подключить бота", time: "3ч назад" },
              ].map((notification, index) => (
                <div
                  key={index}
                  className="bg-white flex w-full max-w-[400px] items-center gap-4 rounded-2xl border border-black p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-black">
                    {notification.name.charAt(0)}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{notification.name}</span>
                      <span className="text-xs text-neutral-600">
                        {notification.time}
                      </span>
                    </div>
                    <span className="text-sm text-neutral-700">
                      {notification.message}
                    </span>
                  </div>
                </div>
              ))}
            </AnimatedList>
          </div>
        </div>
      </section>


      {/* Value Sections - Accordion */}
      <section className="mx-auto max-w-[1340px] px-8 py-20 md:px-16 lg:px-24">
        <Accordion type="single" defaultValue="01" collapsible className="w-full">
          <AccordionItem value="01">
            <AccordionTrigger className="text-left hover:pl-3 hover:[&_div.bg-primary]:bg-secondary duration-1000 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden hover:[&_svg]:rotate-90 hover:[&_svg]:text-primary">
              <div className="flex flex-1 items-start justify-between gap-4">
                <div className="flex gap-3 items-center">
                  <h1 className="text-2xl font-bold">01</h1>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Снижаем ручную работу</h3>
                </div>
                <div className="bg-primary duration-500 rounded-sm flex items-center p-2">
                  <Plus
                    className={cn(
                      "text-primary-foreground size-4 shrink-0 transition-transform duration-1000",
                      "[data-state=open]:rotate-90"
                    )}
                  />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-neutral-700 text-base md:text-lg pb-6 pr-20">
              ИИ-агенты закрывают рутину и сокращают операционные издержки. Автоматизируем повторяющиеся задачи, освобождая время для стратегических решений.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="02">
            <AccordionTrigger className="text-left hover:pl-3 hover:[&_div.bg-primary]:bg-secondary duration-1000 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden hover:[&_svg]:rotate-90 hover:[&_svg]:text-primary">
              <div className="flex flex-1 items-start justify-between gap-4">
                <div className="flex gap-3 items-center">
                  <h1 className="text-2xl font-bold">02</h1>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Усиливаем продажи</h3>
                </div>
                <div className="bg-primary duration-500 rounded-sm flex items-center p-2">
                  <Plus
                    className={cn(
                      "text-primary-foreground size-4 shrink-0 transition-transform duration-1000",
                      "[data-state=open]:rotate-90"
                    )}
                  />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-neutral-700 text-base md:text-lg pb-6 pr-20">
              Квалификация лидов, автоответы, анализ звонков, подсказки менеджерам. ИИ помогает конвертировать больше клиентов и ускоряет цикл сделки.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="03">
            <AccordionTrigger className="text-left hover:pl-3 hover:[&_div.bg-primary]:bg-secondary duration-1000 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden hover:[&_svg]:rotate-90 hover:[&_svg]:text-primary">
              <div className="flex flex-1 items-start justify-between gap-4">
                <div className="flex gap-3 items-center">
                  <h1 className="text-2xl font-bold">03</h1>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Убираем хаос из процессов</h3>
                </div>
                <div className="bg-primary duration-500 rounded-sm flex items-center p-2">
                  <Plus
                    className={cn(
                      "text-primary-foreground size-4 shrink-0 transition-transform duration-1000",
                      "[data-state=open]:rotate-90"
                    )}
                  />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-neutral-700 text-base md:text-lg pb-6 pr-20">
              Строим прозрачные цепочки, показатели и контроль. Видите полную картину бизнеса и можете принимать решения на основе данных.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="04">
            <AccordionTrigger className="text-left hover:pl-3 hover:[&_div.bg-primary]:bg-secondary duration-1000 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden hover:[&_svg]:rotate-90 hover:[&_svg]:text-primary">
              <div className="flex flex-1 items-start justify-between gap-4">
                <div className="flex gap-3 items-center">
                  <h1 className="text-2xl font-bold">04</h1>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Соединяем инструменты</h3>
                </div>
                <div className="bg-primary duration-500 rounded-sm flex items-center p-2">
                  <Plus
                    className={cn(
                      "text-primary-foreground size-4 shrink-0 transition-transform duration-1000",
                      "[data-state=open]:rotate-90"
                    )}
                  />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-neutral-700 text-base md:text-lg pb-6 pr-20">
              YClients, VK, Telegram, CRM — в единую систему. Все данные синхронизированы, никаких разрывов в коммуникации.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Services Accordion */}
      <section id="services" className="relative mx-auto max-w-[1340px] px-8 py-32 md:px-16 lg:px-24">
        <Accordion type="single" defaultValue="1" collapsible className="w-full">
          <AccordionItem value="1" className="last:border-b">
            <AccordionTrigger className="text-left pl-6 md:pl-14 overflow-hidden text-foreground/20 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-primary [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs">01</p>
                <h1 className={`${oswald.className} uppercase relative text-center text-3xl md:text-5xl`}>
                  AI-агенты для продаж
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 pl-6 md:px-20">
              Сценарии, автодиалоги, обработка запросов. Интеллектуальные агенты квалифицируют лидов, отвечают на вопросы и передают готовых клиентов менеджерам.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="2" className="last:border-b">
            <AccordionTrigger className="text-left pl-6 md:pl-14 overflow-hidden text-foreground/20 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-primary [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs">02</p>
                <h1 className={`${oswald.className} uppercase relative text-center text-3xl md:text-5xl`}>
                  ИИ-аналитика звонков
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 pl-6 md:px-20">
              Транскрибация, резюме, выявление проблем. Автоматический анализ всех разговоров с клиентами, выделение ключевых моментов и рекомендации для улучшения.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="3" className="last:border-b">
            <AccordionTrigger className="text-left pl-6 md:pl-14 overflow-hidden text-foreground/20 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-primary [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs">03</p>
                <h1 className={`${oswald.className} uppercase relative text-center text-3xl md:text-5xl`}>
                  Автоматизация контента
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 pl-6 md:px-20">
              Видео, посты, тексты, аналитика. Создание и публикация контента по расписанию, генерация идей и адаптация под разные платформы.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="4" className="last:border-b">
            <AccordionTrigger className="text-left pl-6 md:pl-14 overflow-hidden text-foreground/20 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-primary [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs">04</p>
                <h1 className={`${oswald.className} uppercase relative text-center text-3xl md:text-5xl`}>
                  Интеграции и пайплайны
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 pl-6 md:px-20">
              YClients, VK, WhatsApp, Telegram, Google Sheets. Единая экосистема, где все сервисы работают синхронно без ручных переносов данных.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="5" className="last:border-b">
            <AccordionTrigger className="text-left pl-6 md:pl-14 overflow-hidden text-foreground/20 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-primary [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs">05</p>
                <h1 className={`${oswald.className} uppercase relative text-center text-3xl md:text-5xl`}>
                  CRM-оптимизация
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 pl-6 md:px-20">
              Автоматические воронки, уведомления, статусы. Настройка CRM под ваши процессы, автоматизация рутинных операций и контроль показателей.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="6" className="last:border-b">
            <AccordionTrigger className="text-left pl-6 md:pl-14 overflow-hidden text-foreground/20 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-primary [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs">06</p>
                <h1 className={`${oswald.className} uppercase relative text-center text-3xl md:text-5xl`}>
                  Чат-боты и поддержка
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 pl-6 md:px-20">
              Умные ответы, FAQ, переадресация. Боты обрабатывают типовые запросы 24/7, а сложные вопросы передают операторам с полным контекстом диалога.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Mini-case Section */}
      <section id="cases" className="mx-auto max-w-[1340px] px-8 py-40 md:px-16 lg:px-24">
        <div className="grid gap-16 md:grid-cols-3">
          <CaseStudy
            industry="Телеком"
            result="конверсия"
            resultValue={18}
            resultSign="+"
            items={[
              "Авторазбор звонков",
              "Подсказки менеджерам",
              "Фильтрация спама"
            ]}
          />
          <CaseStudy
            industry="Сеть салонов (YClients)"
            result="нагрузки на администраторов"
            resultValue={34}
            resultSign="–"
            items={[
              "Автоответы",
              "Бронирование слотов",
              "Управление статусами"
            ]}
          />
          <CaseStudy
            industry="Онлайн-школа"
            result="диалогов доведено до результата"
            resultValue={27}
            resultSign="+"
            items={[
              "Анализ диалогов",
              "Гибкие скрипты",
              "Контент-автоматизация"
            ]}
          />
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="bg-white py-32">
        <div className="mx-auto max-w-[1340px] px-8 md:px-16 lg:px-24">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-[52px]">
                Свяжитесь с нами
              </h2>
              <p className="text-lg leading-relaxed text-neutral-700 md:text-xl">
                Оставьте заявку, и мы свяжемся с вами в течение часа. Обсудим ваш проект и подберем решение.
              </p>
            </div>
            <div className="border border-black">
              <form onSubmit={handleSubmit} className="space-y-8 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Ваше имя"
                      className="mt-2"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Компания</Label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Название компании"
                      className="mt-2"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email@company.com"
                      className="mt-2"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telegram">Ник в Telegram</Label>
                    <Input
                      type="text"
                      id="telegram"
                      name="telegram"
                      placeholder="@username"
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Опишите ваш запрос</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Расскажите о задаче, которую хотите решить..."
                    className="mt-2 min-h-[120px]"
                    disabled={isSubmitting}
                  />
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 px-8 rounded-full"
                    disabled={isSubmitting}
                  >
                    <ArrowRight className="mr-2" />
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </Button>
                  {submitMessage && (
                    <p className={`text-sm ${submitMessage.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                      {submitMessage}
                    </p>
                  )}
                  <p className="text-xs text-neutral-600">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Мы не передаем данные третьим лицам.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black bg-white">
        <div className="mx-auto max-w-[1340px] px-8 py-16 md:px-16 lg:px-24">
          <div className="flex flex-col gap-12 md:flex-row md:justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">ALODA</h3>
            </div>
            <div className="flex flex-col gap-8 md:flex-row md:gap-16">
              <div className="flex flex-col gap-3">
                <a href="#services" className="text-sm hover:text-primary transition-colors">
                  Услуги
                </a>
                <a href="#cases" className="text-sm hover:text-primary transition-colors">
                  Кейсы
                </a>
                <a href="#contact" className="text-sm hover:text-primary transition-colors">
                  Контакты
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <a href="mailto:contact@aloda.agency" className="text-sm hover:text-primary transition-colors">
                  contact@aloda.agency
                </a>
                <a href="https://t.me/aloda_agency" className="text-sm hover:text-primary transition-colors">
                  Telegram
                </a>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-black" />
          <div className="text-xs text-neutral-500">
            © 2025 ALODA. AI-автоматизация для бизнеса.
          </div>
        </div>
      </footer>
    </div>
  );
}

function CaseStudy({
  industry,
  result,
  resultValue,
  resultSign,
  items
}: {
  industry: string;
  result: string;
  resultValue?: number;
  resultSign?: string;
  items: string[]
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">
          {industry}
        </p>
        <h4 className="text-3xl font-bold tracking-tight md:text-4xl">
          {resultValue !== undefined ? (
            <>
              <span className="text-primary">{resultSign}
              <NumberTicker value={resultValue} />%</span>{" "}
              {result.replace(/[+-]\d+%\s*/, "")}
            </>
          ) : (
            result
          )}
        </h4>
      </div>
      <Separator className="bg-black" />
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-sm md:text-base">
            <span className="mt-1.5 block h-1 w-1 shrink-0 bg-black" />
            <span className="text-neutral-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
