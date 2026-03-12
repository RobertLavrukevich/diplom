import StatisticaCinema from "../OtherComponents/StatisticaCinema"
import '/src/styles/Statistica.css'

export default function CinemaHomePage(){
    return(
         <>
            <div>HOMEEEE FILMSSS</div>
            <StatisticaCinema users={"1424"} films={"526"} series={"122"} comments={"978"}></StatisticaCinema>
         </>
    )
}