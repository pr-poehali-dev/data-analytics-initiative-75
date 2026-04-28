import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Что такое постановление №87 и почему оно важно?",
    answer:
      "Постановление Правительства РФ №87 «О составе разделов проектной документации» определяет обязательный состав проектной документации для строительства. Без соответствия этому постановлению документация не пройдёт государственную экспертизу и строительство не будет разрешено.",
  },
  {
    question: "Какие разделы документации вы разрабатываете?",
    answer:
      "Мы разрабатываем все разделы по постановлению №87: архитектурные решения (АР), конструктивные решения (КР), инженерные системы (ОВ, ВК, ЭМ, СС), технологические решения, проект организации строительства (ПОС) и прочие разделы. Полный комплект в одной организации.",
  },
  {
    question: "Сколько времени занимает разработка проектной документации?",
    answer:
      "Сроки зависят от типа и сложности объекта. Для жилого дома — от 2 до 4 месяцев на проектную документацию. Рабочая документация разрабатывается параллельно или после. Мы фиксируем сроки в договоре и соблюдаем их.",
  },
  {
    question: "Проходит ли ваша документация государственную экспертизу?",
    answer:
      "Да. Вся документация разрабатывается с учётом требований государственной и негосударственной экспертизы. Мы сопровождаем проект на этапе экспертизы, оперативно вносим замечания и добиваемся положительного заключения.",
  },
  {
    question: "Работаете ли вы с реконструкцией существующих объектов?",
    answer:
      "Да, реконструкция и капитальный ремонт — одно из наших направлений. Проводим техническое обследование, выдаём техническое заключение и разрабатываем полный пакет документации для реконструкции.",
  },
  {
    question: "Как начать работу с вами?",
    answer:
      "Свяжитесь с нами по телефону или email. Мы находимся в Нижнем Тагиле и работаем с объектами по всей России. Обсудим задачу, определим состав документации, стоимость и сроки — и приступим к работе.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}