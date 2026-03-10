import { useNavigate } from 'react-router-dom';
import '/src/styles/StartPage.css';
import Footer from '../OtherComponents/Footer';

export default function StartPage(){
  const navigate = useNavigate();

  return (
        <div className='start-page'>
            <header className='headerstart'> 
                <div className='logostart'>MY REVIEW</div>
            </header>  

             <main className="startpage-main">
              <section className='infostart'>
                <div className="infostart-content">
                  <span className='firstspan'>
                    НЕЗАВИСИМЫЙ РЕСУРС С АВТОРСКИМИ РЕЦЕНЗИЯМИ И НОВОСТЯМИ О МУЗЫКЕ И КИНО. 
                    ВСЁ, ЧТО ВЫ ХОТЕЛИ ЗНАТЬ О НОВЫХ АЛЬБОМАХ И ПРЕМЬЕРАХ.
                  </span>
            
            <div className='secondspan'>
              <h3>НАШИ ОСОБЕННОСТИ</h3>
              <ul>
                <li>АВТОРСКИЕ РЕЦЕНЗИИ</li>
                <li>УДОБНЫЙ КАТАЛОГ</li>
                <li>РЕЙТИНГИ И ЧАРТЫ</li>
                <li>СОЦИАЛЬНАЯ ЛЕНТА</li>
              </ul>
            </div>
          </div>
        </section>
        
        <div className='choosesection'>
          <div 
            className='cinemachoice'
            onClick={() => navigate('/cinema')}
          >
            <div className="choice-content">
              <h2>КИНО</h2>
              <p>Рецензии, новости, рейтинги</p>
              <span className="choice-button">← Перейти</span>
            </div>
            <div className="choice-overlay"></div>
          </div>

          <div 
            className='musicchoice'
            onClick={() => navigate('/music')}
          >
            <div className="choice-content">
              <h2>МУЗЫКА</h2>
              <p>Рецензии, новости, чарты</p>
              <span className="choice-button">Перейти →</span>
            </div>
            <div className="choice-overlay"></div>
          </div>
        </div>
      </main>

            <Footer className="footermain"></Footer>
        </div>
  );
};