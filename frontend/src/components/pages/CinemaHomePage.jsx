import StatisticaCinema from "../OtherComponents/StatisticaCinema"
import CardWork from "../OtherComponents/CardWork"
import CommentCard from "../OtherComponents/CommentCard"
import '/src/styles/Statistica.css'

export default function CinemaHomePage(){
    return(
         <>
            <StatisticaCinema users={"1424"} films={"526"} series={"122"} comments={"978"}></StatisticaCinema>
            <h2 className="firsth2">Активные обсуждения <img className="active-icon" src="https://www.svgrepo.com/show/506715/fire.svg" alt="fire" /></h2>
                        <div className="actual-block">
                            <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/51295609-8106592.jpg"} artistName={"FRIENDLY THUG 52 NGG"} workName={"COW"} rating={"79"}></CardWork>
                            <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/51259126-7174891.jpg"} artistName={"Miyagi, Эндшпиль"} workName={"Голгофа"} rating={"88"}></CardWork>
                            <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/51271186-7522105.jpg"} artistName={"Heronwater"} workName={"Garden"} rating={"45"}></CardWork>
                            <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/51211455-6539505.jpg"} artistName={"ЛСП"} workName={"Tragic City"} rating={"66"}></CardWork>
                            <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/50766656-7539955.jpg"} artistName={"Eminem"} workName={"Lose Yourself"} rating={"89"}></CardWork>
                            <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/51113449-5696743.jpg"} artistName={"пазнякс, OG Buda"} workName={"2 в 1"} rating={"92"}></CardWork>
                            <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/5444239-1436428.jpg"} artistName={"The Weeknd"} workName={"Hurry Up Tomorrow"} rating={"74"}></CardWork>
                            <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/2207141-1436379.jpg"} artistName={"PHARAOH"} workName={"10:13"} rating={"67"}></CardWork>
                        </div>
            
                    <h2 className="secondh2">Последние релизы</h2>
                    <div className="latest-releases-block">
                        <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/1613230-1436375.jpg"} artistName={"Фрэнк Дарабонт, Тим Роббинс, Морган Фриман, Боб Гантон, Уильям Сэдлер"} workName={"Побег из Шоушенка"} rating={"79"}></CardWork>
                        <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/1613230-1436375.jpg"} artistName={"Фрэнк Дарабонт, Тим Роббинс, Морган Фриман, Боб Гантон, Уильям Сэдлер"} workName={"Побег из Шоушенка"} rating={"88"}></CardWork>
                        <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/1613230-1436375.jpg"} artistName={"Фрэнк Дарабонт, Тим Роббинс, Морган Фриман, Боб Гантон, Уильям Сэдлер"} workName={"Побег из Шоушенка"} rating={"45"}></CardWork>
                        <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/1613230-1436375.jpg"} artistName={"Фрэнк Дарабонт, Тим Роббинс, Морган Фриман, Боб Гантон, Уильям Сэдлер"} workName={"Побег из Шоушенка"} rating={"66"}></CardWork>
                        <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/1613230-1436375.jpg"} artistName={"Фрэнк Дарабонт, Тим Роббинс, Морган Фриман, Боб Гантон, Уильям Сэдлер"} workName={"Побег из Шоушенка"} rating={"89"}></CardWork>
                        <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/1613230-1436375.jpg"} artistName={"Фрэнк Дарабонт, Тим Роббинс, Морган Фриман, Боб Гантон, Уильям Сэдлер"} workName={"Побег из Шоушенка"} rating={"92"}></CardWork>
                        <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/1613230-1436375.jpg"} artistName={"Фрэнк Дарабонт, Тим Роббинс, Морган Фриман, Боб Гантон, Уильям Сэдлер"} workName={"Побег из Шоушенка"} rating={"74"}></CardWork>
                        <CardWork imageUrl={"https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/1613230-1436375.jpg"} artistName={"Фрэнк Дарабонт, Тим Роббинс, Морган Фриман, Боб Гантон, Уильям Сэдлер"} workName={"Побег из Шоушенка"} rating={"67"}></CardWork>
                    </div>
            
                    <h2 className="thirdh2">Последние рецензии</h2>
                    <div className="latest-comments-block">
                        <CommentCard imageUrl={"https://avatars.yandex.net/get-music-content/6300975/edc8419d.a.22198404-1/1000x1000"} userName={"Vlad"} userRating={"45"} commentTitle={"Оол выащыа ыал ылвдпжщзц плдчв ывщшзп"} commentContent={"H ksf sklsdkvk svklskl vjskdjv ksldjvklsd jvklsjd ivjsidovj isod fjvv gfgf  gdfgdfgd fdgfdg fdgdsg dfdsf gdsdsfdgd "} nameWork={"Леса и тучи"} nameArtist={"carti"}></CommentCard>
                        <CommentCard imageUrl={"https://avatars.yandex.net/get-music-content/6300975/edc8419d.a.22198404-1/1000x1000"} userName={"EgoPWS"} userRating={"67"} commentTitle={"Рлыа ща лщыащлц ощаыаф пфпк"} commentContent={"Ikos ksjgklsj lsdj kl;gsdl sl;dkgopdfjiogsf dkgdfjgjkjkdfh jfkgdfjkgjdlkfh gjkdfghjkds hgd"} nameWork={"Que que"} nameArtist={"Travis Scott"}></CommentCard>
                        <CommentCard imageUrl={"https://avatars.yandex.net/get-music-content/6300975/edc8419d.a.22198404-1/1000x1000"} userName={"MAYKILLA"} userRating={"46"} commentTitle={"Ддалва в"} commentContent={"dsifui uifaspfsidofj iosdj iospjgois g sgisdfj skjf lsf"} nameWork={"Be here buda"} nameArtist={"LIL UZI VERT"}></CommentCard>
                        <CommentCard imageUrl={"https://avatars.yandex.net/get-music-content/6300975/edc8419d.a.22198404-1/1000x1000"} userName={"msuicmonster"} userRating={"76"} commentTitle={"ОШв шауш аца"} commentContent={"Jdf sjiifsoijfi ojsiojfioafauhjnuiwev"} nameWork={"Plorka"} nameArtist={"Mozzie"}></CommentCard>
                        <CommentCard imageUrl={"https://avatars.yandex.net/get-music-content/6300975/edc8419d.a.22198404-1/1000x1000"} userName={"glamur"} userRating={"82"} commentTitle={"Твддывм"} commentContent={"sdghuhsdugih uhsdghashgjalksjdfkajs guiah jgdsg dsjfkuaiwefj klsdgj uhjskdvsdfhsdjkgs"} nameWork={"Social cmd"} nameArtist={"Рокет"}></CommentCard>
                        <CommentCard imageUrl={"https://avatars.yandex.net/get-music-content/6300975/edc8419d.a.22198404-1/1000x1000"} userName={"bezvody"} userRating={"69"} commentTitle={"Лыалы лвв лв ац"} commentContent={"jJJLKFjlkksjfj wlkf jlkgjflk;d gk;ldfjglkdfjglkdjkgjuidghsjkdgnj kdfgjkdsfhgjk"} nameWork={"Yotyf"} nameArtist={"Гуфи"}></CommentCard>
                    </div>
         </>
    )
}