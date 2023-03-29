import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import style from "./Home.module.css";
export default function Home() {
  return (
    < >
      <section className={style.backimg + " fixed overflow-auto "}>
        <div className='container py-5 h-100'>
          <div className='row'>
            <div className='row d-flex justify-content-end align-items-center'>
              <p className={style.fontfamily}>ملتقى القرآن الكريم - جنة النجاح </p>
              <Carousel className='w-50'>
                <Carousel.Item>
                  <img
                    className="d-block w-100 m-auto"
                    src={require('./img/himam.jpg')}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 m-auto"
                    src={require('./img/himam1.jpg')}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 m-auto"
                    src={require('./img/himam.jpg')}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
              <Carousel className='w-50  '>
                <Carousel.Item>
                  <img
                    className="d-block w-100 m-auto"
                    src={require('./img/himam.jpg')}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 m-auto"
                    src={require('./img/himam1.jpg')}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 m-auto"
                    src={require('./img/himam.jpg')}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <p className={style.capfontfamily+" mt-5"}>تأسس ملتقى القرآن الكريم في 21/ ذي الحجة /1432هـ بجهد مشكور من عميد كلية الشريعة ورئيس ملتقى القرآن الكريم د.جمال الكيلاني وبمباركة من رئيس الجامعة أ.د. رامي الحمد لله.
              مشروعُ ملتقى القرآنِ الكريم، فريدٌ من نوعهِ على مستوى الجامعة وعلى مستوى الوطن، وقد حازَ على إقبالٍ كبيرٍ من قِبَلِ الطلبةِ من كافةِ الكلياتِ والتخصصات، ويهدفُ ملتقى القرآنِ الكريمِ إلى تلاقي طلابِ وطالباتِ الجامعةِ في رياضِ الإيمان، يجمعهمْ كلامُ اللهِ في جوٍ روحانيٍّ يخرجُهمْ من رَتابةِ اليومِ الدراسيِّ إلى عالم القرآن، ليستغلوا بذلكَ أوقاتَ فراغِهم في حفظِ كتابِ اللهِ عزَّ وجلّ، وتدارُسِه فيما بينهم.
              كما يعقد ملتقى القرآن الكريم العديد من المسابقات القرآنية لتشجيع الطلبة على الحفظ وقد تميزت المسابقات بمشاركة عدد كبير من الطلبة سواء في المسابقات السنوية أو في المسابقات الفصلية التي تعقد في سور من القرآن الكريم خلال الفصل .
              كذلك يعقد ملتقى القرآن الكريم العديد من الندوات للطلاب تتعلق بحفظ القرآن الكريم والتشجيع على خدمته وتشهد إقبالا كبيرا من الطلبة.
              وكذلك يقيم الملتقى احتفالات سنوية لطلبته لتكريم المتفوقين منهم، كما ويقيم احتفالات خلال الفصل لتكريم الفائزين في المسابقات.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}