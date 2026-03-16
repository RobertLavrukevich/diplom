import StatisticaMusic from "../OtherComponents/StatisticaMusic"
import CardWork from "../OtherComponents/CardWork"
import CommentCard from "../OtherComponents/CommentCard"
import '/src/styles/MusicHome.css'

export default function MusicHomePage(){
    return(
        <>
        <StatisticaMusic users={"1424"} tracks={"432"} albums={"324"} comments={"1233"}></StatisticaMusic>

        <h2 className="firsth2">Активные обсуждения <img className="active-icon" src="https://www.svgrepo.com/show/506715/fire.svg" alt="fire" /></h2>
            <div className="actual-block">
                <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/15682289/b32b5025.a.40985691-1/1000x1000"} artistName={"FRIENDLY THUG 52 NGG"} workName={"COW"} rating={"79"}></CardWork>
                <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/10139807/520d664e.a.28719429-1/1000x1000"} artistName={"Miyagi, Эндшпиль"} workName={"Голгофа"} rating={"88"}></CardWork>
                <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/7852894/aab9e55a.a.25511786-1/1000x1000"} artistName={"Heronwater"} workName={"Garden"} rating={"45"}></CardWork>
                <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/4399834/0415f8b8.a.17439837-1/1000x1000"} artistName={"ЛСП"} workName={"Tragic City"} rating={"66"}></CardWork>
                <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/34131/6fd4311d.a.4846-2/1000x1000"} artistName={"Eminem"} workName={"Lose Yourself"} rating={"89"}></CardWork>
                <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/18132539/af662d1a.a.40849279-1/1000x1000"} artistName={"пазнякс, OG Buda"} workName={"2 в 1"} rating={"92"}></CardWork>
                <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/14662984/4557faab.a.35219103-2/1000x1000"} artistName={"The Weeknd"} workName={"Hurry Up Tomorrow"} rating={"74"}></CardWork>
                <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/14299670/839df7f2.a.36417583-1/1000x1000"} artistName={"PHARAOH"} workName={"10:13"} rating={"67"}></CardWork>
            </div>

        <h2 className="secondh2">Последние релизы</h2>
        <div className="latest-releases-block">
            <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/15682289/b32b5025.a.40985691-1/1000x1000"} artistName={"FRIENDLY THUG 52 NGG"} workName={"COW"} rating={"79"}></CardWork>
            <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/10139807/520d664e.a.28719429-1/1000x1000"} artistName={"Miyagi, Эндшпиль"} workName={"Голгофа"} rating={"88"}></CardWork>
            <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/7852894/aab9e55a.a.25511786-1/1000x1000"} artistName={"Heronwater"} workName={"Garden"} rating={"45"}></CardWork>
            <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/4399834/0415f8b8.a.17439837-1/1000x1000"} artistName={"ЛСП"} workName={"Tragic City"} rating={"66"}></CardWork>
            <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/34131/6fd4311d.a.4846-2/1000x1000"} artistName={"Eminem"} workName={"Lose Yourself"} rating={"89"}></CardWork>
            <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/18132539/af662d1a.a.40849279-1/1000x1000"} artistName={"пазнякс, OG Buda"} workName={"2 в 1"} rating={"92"}></CardWork>
            <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/14662984/4557faab.a.35219103-2/1000x1000"} artistName={"The Weeknd"} workName={"Hurry Up Tomorrow"} rating={"74"}></CardWork>
            <CardWork imageUrl={"https://avatars.yandex.net/get-music-content/14299670/839df7f2.a.36417583-1/1000x1000"} artistName={"PHARAOH"} workName={"10:13"} rating={"67"}></CardWork>
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