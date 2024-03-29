import React, { useEffect, useState } from 'react'
import style from "./MoltaqaStatus.module.css"
import axios from 'axios';
export default function MoltaqaStatus() {
    let [multaqaStutas, setMultaqaStutas] = useState({
    });
    useEffect(() => {
        getMultaqaStatus();
    }, []);
    async function getMultaqaStatus() {
        //show to status // 
        let { data } = await axios.get('http://localhost/multaqa/api/doctor_profile.php');
        console.log(data.doctor_profile);
        setMultaqaStutas(data.doctor_profile);
        console.log(multaqaStutas);
    }
    return (
        <>
            <div className={style.backimg + " py-5 fixed overflow-auto"}>
                <div className={style.pricing_header + " px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"}>
                    <h1 className=" display-4 ">...لا تيأس</h1>
                    <p className=" fw-bold m-auto ">"حَامِلُ القُرْآنِ حَامِلُ رَايَةِ الإِسْلَامِ، لَا يَنْبَغِي أَنْ يَلْهُوَ مَعَ مَنْ يَلْهُو، وَلَا يَسْهُوَ مَعَ مَنْ يَسْهُو، وَلَا يَلْغُوَ مَعَ مَنْ يَلْغُو.. تَعْظِيمًا لِحَقِّ القُرْآنِ."</p>
                </div>
                <div className=" container ">
                    <div className={style.card_deck + " row grid gap-3 d-flex justify-content-center "}>
                        <div className={style.box_shadow + " text-white d-flex mb-5 col-3 card"}>
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">محصلة الحفظ لهذا الفصل</h4>
                            </div>
                            <div className="card-body">
                                <h1 className=" card-title pricing-card-title">
                                    {multaqaStutas.no_of_save_pages}
                                </h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <p className='fw-bold text-white'>
                                        إنْ قَلّ فِي الطّريقِ صَبرُك ،
                                        لا تَقِف ..
                                        لا تَنطَفئْ ..
                                        لا تَيأس ..
                                        فَـ وُصولُ نقطةِ النّهاية يُغنيكَ عَن كلّ شُعورٍ سيئ .
                                    </p>
                                </ul>
                            </div>
                        </div>
                        <div className={style.box_shadow + "  text-white card mb-5 d-flex col-3"}>
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">محصلة المراجعة لهذا الفصل</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">{multaqaStutas.no_of_review_pages}</h1>
                                <ul className="list-unstyled mt-3 mb-5">
                                    <p className='fw-bold'>
                                        ثَمن نَجاحات الغد ؛ أَنْ نَتعبَ لَها اليَوم . . .
                                        وَحقيقَةُ الوُصولِ تَكمنُ فِي قُوّة السّعي
                                    </p>
                                </ul>
                            </div>
                        </div>
                        <div className={style.box_shadow + "  text-white card mb-5 d-flex col-3 ="}>
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">محصلة الإمتحانات لهذا الفصل</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">{multaqaStutas.no_of_exam}</h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <p className='fw-bold'>
                                        رُبّما الخطى ثَقيلة على طَريقِ الحُلم . . .
                                        لـكن لذّة الوُصولِ للنِهَايةِ تَستحقّ كُل ذلكَ التّعب
                                    </p>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
