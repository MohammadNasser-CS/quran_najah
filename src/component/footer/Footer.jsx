import React from 'react'
import style from "./Footer.module.css";
export default function Footer() {
    return (
        <>
            <footer className={style.backg + " overflow-auto text-center text-white"}>
                {/* Grid container */}
                <div className="container p-3 pb-0">
                    {/* Section: Social media */}
                    <section className="mb-3">
                        {/* Facebook */}
                        <a className="btn btn-outline-light btn-floating m-1" target='_blank' href="https://www.facebook.com/%D9%85%D9%84%D8%AA%D9%82%D9%89-%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86-%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85-%D8%AC%D8%A7%D9%85%D8%B9%D8%A9-%D8%A7%D9%84%D9%86%D8%AC%D8%A7%D8%AD-141778839846391/" role="button"><i className="fab fa-facebook-f" /></a>
                        {/* Youtube */}
                        <a className="btn text-red btn-outline-light btn-floating  m-1" href="https://www.youtube.com/channel/UCBILB7nbZ3MsjwdOr39kpuw" target='_blank' role="button"><i className="fab fa-youtube" /></a>
                        {/* SoundCloud */}
                        <a className="btn text-red btn-outline-light btn-floating  m-1" href="https://www.soundcloud.com/user-610072443" target='_blank' role="button"><i className="fab fa-soundcloud" /></a>
                    </section>
                    {/* Section: Social media */}
                </div>
                {/* Grid container */}
                <div className="text-center p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>

                    <a className="text-white" href="https://mdbootstrap.com/">ملتقى القرآن الكريم - جنة النجاح </a>
                </div>
            </footer>

        </>
    )
}
