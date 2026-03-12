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
            <img src="/icons/film-alt-svgrepo-com.svg" alt="film" className='filmimg'/>
            <div className="choice-content">
              <h2>КИНО</h2>
              <span className="choice-button">← Перейти</span>
            </div>
            <div className="choice-overlay"></div>
          </div>

          <div 
            className='musicchoice'
            onClick={() => navigate('/music')}
          >
            <img src="/icons/music-svgrepo-com.svg" alt="music" className='musicimg'/>
            <div className="choice-content">
              <h2>МУЗЫКА</h2>
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