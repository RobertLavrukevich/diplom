import '/src/styles/Footer.css'

export default function Footer(){
    return(
        <footer className="footer">
      <div className="footer-container">
        <div className="footer-social">
          <h3 className="footer-title">Следите за нами</h3>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Vkontakte">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12.6 17.4c-4.5 0-7-3-7.1-8h2.2c0 3.6 1.7 5.2 2.9 5.5V9.4h2v3.1c1.2-.1 2.4-1.6 2.8-3.1h2c-.3 1.9-1.8 3.4-2.9 4 1.1.5 2.9 1.9 3.2 4.7h-2.2c-.3-1.8-1.4-3.1-2.8-3.3v3.3h-.2z"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Telegram">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.36-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 12.69c-.2.75-.79 1.34-1.54 1.54-1.36.37-4.05.37-4.05.37s-2.69 0-4.05-.37c-.75-.2-1.34-.79-1.54-1.54-.37-1.36-.37-4.05-.37-4.05s0-2.69.37-4.05c.2-.75.79-1.34 1.54-1.54 1.36-.37 4.05-.37 4.05-.37s2.69 0 4.05.37c.75.2 1.34.79 1.54 1.54.37 1.36.37 4.05.37 4.05s0 2.69-.37 4.05zM10.5 9.5v5l4-2.5-4-2.5z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-info">
          <div className="footer-copyright">
            «MY REVIEW» © 2026
          </div>
          <p className="footer-link">Обратная связь</p>
          <p className="footer-link">Политика обработки персональных данных</p> 
          <p className="footer-link">О нас</p>
          
          <div className="footer-contacts">
            <div className="footer-contact">
              Техническая поддержка: support@myreview.com
            </div>
            <div className="footer-contact">
              Предложения о сотрудничестве: info@myreview.com
            </div>
          </div>
        </div>
      </div>
    </footer>
    )
}