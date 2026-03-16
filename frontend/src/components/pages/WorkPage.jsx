import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '/src/styles/WorkPage.css';
import CommentForm from '../OtherComponents/CommentForm';
import CommentCard from '../OtherComponents/CommentCard';


export default function WorkPage({category, workType}) {
    const { workId} = useParams();
    const [work, setWork] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchWorkData = async () => {
            try {
                
                setTimeout(() => {
                     if (category === 'music') {
                        if(workType === 'album'){
                    setWork({
                        id: workId,
                        title: 'Views',
                        artist:'Drake',
                        imageUrl:'https://avatars.yandex.net/get-music-content/2441215/3e3dc14e.a.3481735-3/m1000x1000',
                        releaseDate: '2016-05-21',
                        genre: 'R&B',
                        averageRating: '92',
                        totalReviews: 25,
                    });
                }
                        else if(workType === 'single'){
                            setWork({
                                id: workId,
                                title:'good kid mad city',
                                artist:'Kendrick Lamar',
                                imageUrl:'https://avatars.yandex.net/get-music-content/28589/98382a55.a.1174459-1/m1000x1000',
                                releaseDate: '2016-05-21',
                                genre: 'Хип-хоп',
                                averageRating: '92',
                                totalReviews: 25,
                            });
                        }
                }
                else if (category === 'cinema'){
                    if(workType === 'film'){
                    setWork({
                        id: workId,
                        title: 'Интерстеллар',
                        artist:'Мэттью Макконахи ,Энн Хэтэуэй, Джессика Честейн, Маккензи Фой, Майкл Кейн, Дэвид Джеси, Уэс Бентли, Кейси Аффлек, Джон Литгоу, Мэтт Дэймон',
                        imageUrl:'https://kinopoisk-ru.clstorage.net/v29w8X356/df6758C0s0/rIVZCJ3uBu66hfme1EbTd022JrUxGzCL0HHqhjJhh87zNJvFOmVfYn_S0Bq-98zngB9HuOdHnKafum7ZDRJdeO7cHFHC_E3n7tu21IQagyIF-XrmJ1J42JRs-dZsPqj-2waytxxad0JTs5Zb-emRutlfA-S-BMO6iK0c40hTPCO1qWgQhtZj4ISDkKP0efpeeP0FgShHGJndDvCWEmKS0eorto4ZZ1JESqqkaeSxs7fDVB_IvRHc3KmeB_YYQSIflrJHJLnSW86ooKCp0Vjwe1b9H6QsbgSkwCbwjjdAgdffN4C-IXpuQFm0m0HUspS74VcW37Mfwva1rDLaJUUPDZyxZA-FxETgmJWWhNxt8EtZ7QSDJlMkuMA-yp8beY_s1QGZmRxxUXJYrLdmxKaCt_N9Ov2YANzelZE36x1uKheMnlQbrtBewpezro_CeOBrWskbvBFXPILFMOylCH-n5sAqmb4UbFhXYJqrTeS2iKHGRAffsyXf2oibL80GQDQdg69jCoXMcdK_tbmW0kzHZGf3HJUMdjOUzDPDhTpfmcXbJrysBFFfVWuqs3b-q5ea9mY2z78t3e2_jCXkO0IrLayKbhGo7Vvrh4CGlcNHzWRU2RCSEUQihfc_-LUtaK7O1TOTmydqRn9wiIRt_6qysPh3H8yxFN_8uZoU-zpDECGpoWoois967Y6ThInhSsdWctUhmBVDI43GLfS2C1iD4PsKvL4FfXdwcqSXeN-Bj4XjfT3Kszzs97CTAf0idQwzl5F5M5joQPq6ooCr23DdQn7yL5gATh-l3gn4nxFqtOXCKqGnFXl4SH6Rs3zZiqi5-3gxxpot-MeNlSHaG3EKDLKGVxyu2UXMmruHtOZw5HF58A2zLWAwu9QM6Y4MWI_L1jelpBZZWlxjh4N6_LW9hvN8IeSzNsP9mbwF6CJ3EhCNjmQAqdpH4qqcnpTQX_FkcfUCmh9VILfPLfu1D0eZ5uIOvJkrf0hxbaqgVe2Kt5z-WyLkkhzM7JS5Me8iYzYaiIFOHqP8UdWRvq-L213DW0T9Ip8yXTaM7jTLuStgp_TcBqS5BEVEd2uuh0vUhqCq2kQ42Z0AysWbjhrTKUMKPaqnaByY_2PCsL2DkOJi-HlFyi27Nls4jMwX1KwVeIXO9wKlnDJ5R2xWsaRF_YqfntVmJ8SQJPjTq5kz8hlpDj-Msk8RvNth5a6Gk73TWu16RewAnx9kP6TPCuaHNG2f1_IpkaUyWHBnfI65fdu_r4rVXR_ogzTJzrOTGdIBQzQ7rJJjD5X5adC8sZC_wG_lcHnUMrwWeQ2tywn0hzVLuNfKEZ-dBUdsYWq_jVTfqam51FU1yJ8AzOKrmxDwD1EVBaOgWyO781vJmbC2o8Nr7lt73x6cB3I0v_Ez8YYWfqPS-CSdsQZES2p1lJZFyJKwtP51KdmFFdH-tLkG1RluFzmQt1Uguvdq-pqXtYPye9lZWfQMqj9TD7bnFc-3K0-Wze8TmYEbfld2c4mlesCWu5H0SgnPkCP62pmXAsoefhwssKlLOon0YcG1vbSpxlvAfUH-GaI3eBy74TfsmwhbverTKJuKFGl8Tk20s2HhoLG02kQ8xb0Z7NiArDTFMnYUArGiTzmA5GPQm6Sdg-Zx1kdPwQySNloGmcUb1a4qe6Pb3hCkihRbempXiJR94q6WlN1kP9ykJfH4sogV8TtXIjSujmAFoPNb27izp6jBZOR8fNEEkyR5HKLWHtiNK22c2P8gtKwpRk1vXKytR9S0qJrbfSPCvyf414OsIv0FTS4Zqr5iBoDbZ9uflaKf_XvzZUXwMLIMXTWa0ivXnRZCsdTZJIKPOURtcneMhmr7rKmW21Ed_5U65tGKkSvWA0EVIY6uXz2b-lzvhpWQieBP53Z56x6EL0MYmcsIzpYZVIXn1jKTnBFNc0BXpJVA4ba4kudlIcOQPdzHg74Z0AdxMgS1pn0PoM1t4rixhazlTsZ-ePkasxNYPJzhGfWGCWui6fsKnpwhUGxiSKmGesayoLnfdTXlvx3_3py2Cv0vUQI8iYVjDZjuYum2g5Wp-ETjRVzrCbMCfBSWwiXgvSllv9LZHpGDN0J3Y0i_gErLr62kx1kLzLUG3u2Qiyj0MV4zAJGGSSi5-njvn7mQjf573UdC2zKYBEABmu8x5qkWT6XT7z6ejgROSkZzjq9b1peRn8F0PP2-G9HVrb4AyyNPMhKgnnoYgPJF852_v5PFbc5aVMoqtjx1IqDLLOKDLE-n8eIjmY4Hf3JOeYmgeM2Es4PeRTrJsznG1ZCBBO4ccBEfo4JhG5vZUMCkkJSf22fcU2HaD7o1fD2G4B3RnjdDv9HCIJqmOWxvYWKQjE78qLmR8nIywY4dwvqUjA3QK0MDH6CdfCS91kzSro6CgNJ43EdW4QCzJHAdlMIb7YAqd7bs6gmTrCB_TXxTrKdEwb-Zo-dJKsq2HfHwq6sT6CBICRmeqGshus960KeuhLLNRuV9U_IBhgZ7NbrzK-ygEEe2wuoGgKwdS3lNc66sXNeglYvWXxHfjxHRxbKIL9oZfSoanqFqDbjaePqJtaeE92n7f0LIJYUyejWE0SvStyR0pMnsNLubBlJ_S1Clq1jtkZmR8GIF_7w7x9u1ihbYMGswOYmmXwq7y1DwkISRtNR__kJx2iOCPFcfncMK9JkyVpTv2Q2HpgNSTEBRtrhL6aGWkeNFF_KfJ_vsvZsQ0glpJg2Dg1UDicd79ZaApq7yevh7T88_vRR3GJvSGMyHMXeb5_IBlZ4VSm1Uc7qvWMmouLXeZhj6ljLt4LazEN4fQQsvnaVELqncROSzuLS00GDlZ0buA58pRj6U7RDKpTdDr-TXKom_O35mZn2kmE3nkKqUwkU-8ocl6-aNtznxCm8MJ72XSQ2e73zxt7OhgvZkxGVY0g6UPH47qskt6Z4vQaTS2xepkTlHVlZqlLRH_Je3kuZWHsy2LfzljbQ',
                        releaseDate: '2022-02-17',
                        genre:'Экшен',
                        averageRating: '88',
                        totalReviews: 12,
                        });
                        }
                    else if(workType === 'series'){
                        setWork({
                        id: workId,
                        title: 'Во все тяжкие',
                        artist: 'Брайан Крэнстон, Анна Ганн, Аарон Пол ,Дин Норрис ,Бетси Брандт, АрДжей Митти, Боб Оденкёрк, Джанкарло Эспозито, Джонатан Бэнкс, Роберт Форстер',
                        imageUrl:'https://kinopoisk-ru.clstorage.net/v29w8X356/df6758C0s0/rIVZCJ3uBu66hfme1EbTd022JrUxGzCL0HHqhjJhh87zNJvFOmVfYn_S0BW-983rjx8V6eRCnKXMvm6PChQAeO6GFF_C_0u169u0gYMRhSFToS3jdw142JRs-dZsPqj-2waytxxad0JTs5Zb-emRutlfA-S-BMO6iK0c40hTPCO1qWgQhtZj4ISDkKP0efpeeP0FgShHGJndDvCWEmKS0eorto4ZZ1JESqqkaeSxs7fDVB_IvRHc3KmeB_YYQSIflrJHJLnSW86ooKCp0Vjwe1b9H6QsbgSkwCbwjjdAgdffN4C-IXpuQFm0m0HUspS74VcW37Mfwva1rDLaJUUPDZyxZA-FxETgmJWWhNxt8EtZ7QSDJlMkuMA-yp8beY_s1QGZmRxxUXJYrLdmxKaCt_N9Ov2YANzelZE36x1uKheMnlQbrtBewpezro_CeOBrWskbvBFXPILFMOylCH-n5sAqmb4UbFhXYJqrTeS2iKHGRAffsyXf2oibL80GQDQdg69jCoXMcdK_tbmW0kzHZGf3HJUMdjOUzDPDhTpfmcXbJrysBFFfVWuqs3b-q5ea9mY2z78t3e2_jCXkO0IrLayKbhGo7Vvrh4CGlcNHzWRU2RCSEUQihfc_-LUtaK7O1TOTmydqRn9wiIRt_6qysPh3H8yxFN_8uZoU-zpDECGpoWoois967Y6ThInhSsdWctUhmBVDI43GLfS2C1iD4PsKvL4FfXdwcqSXeN-Bj4XjfT3Kszzs97CTAf0idQwzl5F5M5joQPq6ooCr23DdQn7yL5gATh-l3gn4nxFqtOXCKqGnFXl4SH6Rs3zZiqi5-3gxxpot-MeNlSHaG3EKDLKGVxyu2UXMmruHtOZw5HF58A2zLWAwu9QM6Y4MWI_L1jelpBZZWlxjh4N6_LW9hvN8IeSzNsP9mbwF6CJ3EhCNjmQAqdpH4qqcnpTQX_FkcfUCmh9VILfPLfu1D0eZ5uIOvJkrf0hxbaqgVe2Kt5z-WyLkkhzM7JS5Me8iYzYaiIFOHqP8UdWRvq-L213DW0T9Ip8yXTaM7jTLuStgp_TcBqS5BEVEd2uuh0vUhqCq2kQ42Z0AysWbjhrTKUMKPaqnaByY_2PCsL2DkOJi-HlFyi27Nls4jMwX1KwVeIXO9wKlnDJ5R2xWsaRF_YqfntVmJ8SQJPjTq5kz8hlpDj-Msk8RvNth5a6Gk73TWu16RewAnx9kP6TPCuaHNG2f1_IpkaUyWHBnfI65fdu_r4rVXR_ogzTJzrOTGdIBQzQ7rJJjD5X5adC8sZC_wG_lcHnUMrwWeQ2tywn0hzVLuNfKEZ-dBUdsYWq_jVTfqam51FU1yJ8AzOKrmxDwD1EVBaOgWyO781vJmbC2o8Nr7lt73x6cB3I0v_Ez8YYWfqPS-CSdsQZES2p1lJZFyJKwtP51KdmFFdH-tLkG1RluFzmQt1Uguvdq-pqXtYPye9lZWfQMqj9TD7bnFc-3K0-Wze8TmYEbfld2c4mlesCWu5H0SgnPkCP62pmXAsoefhwssKlLOon0YcG1vbSpxlvAfUH-GaI3eBy74TfsmwhbverTKJuKFGl8Tk20s2HhoLG02kQ8xb0Z7NiArDTFMnYUArGiTzmA5GPQm6Sdg-Zx1kdPwQySNloGmcUb1a4qe6Pb3hCkihRbempXiJR94q6WlN1kP9ykJfH4sogV8TtXIjSujmAFoPNb27izp6jBZOR8fNEEkyR5HKLWHtiNK22c2P8gtKwpRk1vXKytR9S0qJrbfSPCvyf414OsIv0FTS4Zqr5iBoDbZ9uflaKf_XvzZUXwMLIMXTWa0ivXnRZCsdTZJIKPOURtcneMhmr7rKmW21Ed_5U65tGKkSvWA0EVIY6uXz2b-lzvhpWQieBP53Z56x6EL0MYmcsIzpYZVIXn1jKTnBFNc0BXpJVA4ba4kudlIcOQPdzHg74Z0AdxMgS1pn0PoM1t4rixhazlTsZ-ePkasxNYPJzhGfWGCWui6fsKnpwhUGxiSKmGesayoLnfdTXlvx3_3py2Cv0vUQI8iYVjDZjuYum2g5Wp-ETjRVzrCbMCfBSWwiXgvSllv9LZHpGDN0J3Y0i_gErLr62kx1kLzLUG3u2Qiyj0MV4zAJGGSSi5-njvn7mQjf573UdC2zKYBEABmu8x5qkWT6XT7z6ejgROSkZzjq9b1peRn8F0PP2-G9HVrb4AyyNPMhKgnnoYgPJF852_v5PFbc5aVMoqtjx1IqDLLOKDLE-n8eIjmY4Hf3JOeYmgeM2Es4PeRTrJsznG1ZCBBO4ccBEfo4JhG5vZUMCkkJSf22fcU2HaD7o1fD2G4B3RnjdDv9HCIJqmOWxvYWKQjE78qLmR8nIywY4dwvqUjA3QK0MDH6CdfCS91kzSro6CgNJ43EdW4QCzJHAdlMIb7YAqd7bs6gmTrCB_TXxTrKdEwb-Zo-dJKsq2HfHwq6sT6CBICRmeqGshus960KeuhLLNRuV9U_IBhgZ7NbrzK-ygEEe2wuoGgKwdS3lNc66sXNeglYvWXxHfjxHRxbKIL9oZfSoanqFqDbjaePqJtaeE92n7f0LIJYUyejWE0SvStyR0pMnsNLubBlJ_S1Clq1jtkZmR8GIF_7w7x9u1ihbYMGswOYmmXwq7y1DwkISRtNR__kJx2iOCPFcfncMK9JkyVpTv2Q2HpgNSTEBRtrhL6aGWkeNFF_KfJ_vsvZsQ0glpJg2Dg1UDicd79ZaApq7yevh7T88_vRR3GJvSGMyHMXeb5_IBlZ4VSm1Uc7qvWMmouLXeZhj6ljLt4LazEN4fQQsvnaVELqncROSzuLS00GDlZ0buA58pRj6U7RDKpTdDr-TXKom_O35mZn2kmE3nkKqUwkU-8ocl6-aNtznxCm8MJ72XSQ2e73zxt7OhgvZkxGVY0g6UPH47qskt6Z4vQaTS2xepkTlHVlZqlLRH_Je3kuZWHsy2LfzljbQ',
                        releaseDate: '2022-02-17',
                        genre:'Фантастика',
                        averageRating: '88',
                        totalReviews: 12,
                        });
                    }
                }

                    setReviews([
                        {
                            id: 1,
                            userAvatar: 'https://avatars.yandex.net/get-music-content/6300975/edc8419d.a.22198404-1/1000x1000',
                            userName: 'Иван Петров',
                            rating: 95,
                            title: 'Шедевр на все времена',
                            content: 'Это одно из лучших произведений, которые я когда-либо слышал/видел...',
                            date: '2026-03-10',
                            likes: 45,
                        },
                        {
                            id: 2,
                            userAvatar: 'https://avatars.yandex.net/get-music-content/6300975/edc8419d.a.22198404-1/1000x1000',
                            userName: 'Анна Смирнова',
                            rating: 88,
                            title: 'Очень достойно',
                            content: 'Отличная работа, но есть небольшие недостатки...',
                            date: '2026-03-09',
                            likes: 23,
                        },
                         {
                            id: 3,
                            userAvatar: 'https://avatars.yandex.net/get-music-content/6300975/edc8419d.a.22198404-1/1000x1000',
                            userName: 'Cenitel',
                            rating: 81,
                            title: 'Очень очень хорошо',
                            content: 'Авыа ываука ука укафу уауа ф аыв афыв аывыв аываы аоыоа орфыа рыфаргыфрагш фрагышр фгшаргф рагыраг ыфгшр афырафоы арфолыар оыррфо рафо фор аофдварфдллра фор оаырва рво во рвор вр о раов равр ав равовоаов раоырла дно из лучших произведений, которые я когда-либо слышал/видел...',
                            date: '2026-03-10',
                            likes: 22,
                        },
                    ]);
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error('Ошибка загрузки:', error);
                setLoading(false);
            }
        };

        fetchWorkData();
    }, [category, workType, workId]);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <>
        <div className="work-page-container">
            <div className="work-header">
                <img src={work.imageUrl} alt={work.title} className="work-main-image" />
                
                <div className="work-main-info">
                    <h1 className="work-title">{work.title}</h1>
                    
                    <div className="work-meta">
                        <p className="work-artist">
                            <strong>{workType === 'album' ? 'Исполнитель:' : 'Актёры:'}</strong> {work.artist}
                        </p>
                        <p className="work-date">
                            <strong>Дата выхода:</strong> {new Date(work.releaseDate).toLocaleDateString()}
                        </p>
                        <p className="work-genre">
                            <strong>Жанр:</strong> {work.genre}
                        </p>
                    </div>

                    <div className="work-rating-block">
                        <div className="work-average-rating">
                            <span className="rating-label">Рейтинг:</span>
                            <span className="rating-value">{work.averageRating}</span>
                        </div>
                        <div className="work-reviews-count">
                            📝 {work.totalReviews} рецензий
                        </div>
                    </div>

                    {/* <p className="work-description">{work.description}</p> */}
                </div>
            </div>
            <CommentForm></CommentForm>


            <div className="reviews-section">
                <h2 className="reviews-title">Рецензии</h2>
                
                <div className="reviews-list">
                    {reviews.map(review => (
                        <CommentCard
                            key={review.id}
                            imageUrl={review.userAvatar}
                            userName={review.userName}
                            userRating={review.rating}
                            commentTitle={review.title}
                            commentContent={review.content}
                            nameWork={work.title}
                            nameArtist={work.artist}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}
