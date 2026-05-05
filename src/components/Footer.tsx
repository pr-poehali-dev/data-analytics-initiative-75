export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="inline-flex items-center gap-3 mb-6">
              <img
                src="https://cdn.poehali.dev/projects/af9ebfcc-441a-4723-a986-fd69244095d4/files/3ef4f124-2f26-4675-bf97-08a1fc52261d.jpg"
                alt="Путь Будущего"
                className="w-11 h-11 object-contain rounded-sm"
              />
              <span className="text-foreground text-base font-medium tracking-wide">Путь Будущего</span>
            </a>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Проектная организация «Путь Будущего» — разработка документации всех разделов по постановлению №87.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium mb-4">Студия</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#projects" className="hover:text-foreground transition-colors">
                  Проекты
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-4">Связь</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:danilAkz@yandex.ru" className="hover:text-foreground transition-colors">
                  danilAkz@yandex.ru
                </a>
              </li>
              <li>
                <a href="tel:+79937747597" className="hover:text-foreground transition-colors">
                  +7 (993) 774-75-97
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/dagio96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Телеграм @dagio96
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Путь Будущего. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}