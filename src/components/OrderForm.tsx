import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import Icon from "@/components/ui/icon"

export function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    objectType: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время.",
      })
      setFormData({ name: "", phone: "", email: "", objectType: "", message: "" })
      setSubmitting(false)
    }, 600)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="order" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Форма заявки</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance">
              Заказать проект
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Оставьте заявку — мы свяжемся с вами, обсудим задачу и предложим решение.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 md:p-12 border border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-foreground">
                  Имя <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm mb-2 text-foreground">
                  Телефон <span className="text-orange-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-foreground">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="objectType" className="block text-sm mb-2 text-foreground">
                Тип объекта
              </label>
              <select
                id="objectType"
                name="objectType"
                value={formData.objectType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors"
              >
                <option value="">Выберите тип объекта</option>
                <option value="residential">Жилое здание</option>
                <option value="commercial">Общественный/коммерческий объект</option>
                <option value="industrial">Промышленный объект</option>
                <option value="reconstruction">Реконструкция/капремонт</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm mb-2 text-foreground">
                Описание задачи
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors resize-none"
                placeholder="Расскажите кратко о вашем объекте и задаче"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-sm tracking-wide hover:bg-foreground/90 transition-colors duration-300 group disabled:opacity-60"
            >
              {submitting ? "Отправляем..." : "Отправить заявку"}
              <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
