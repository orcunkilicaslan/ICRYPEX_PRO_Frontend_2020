import { Fragment } from "react";
import "bootstrap/dist/js/bootstrap.bundle.js";

import "./App.scss";
import UnknownProfileAvatar from "./assets/images/Unknown_Profile_Avatar_Icon.svg";

import { Header } from "./components/header/Header.jsx";

function App() {
  return (
    <Fragment>
      <Header />
      <div style={{ margin: "4rem 0", width: "100%", border: "1px solid red"}} />
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            {/* <!-- Head Left --> */}
            <div className="header-left col-auto">
              <div className="header-left-logo">
                <a
                  className="headlogo"
                  href="Home_Page.html"
                  title="ICRYPEX PRO"
                  rel="bookmark"
                >
                  ICRYPEX PRO
                </a>
              </div>
              <div className="header-left-btn">
                <a
                  className="btn btn-sm btn-primary"
                  href="Kolay_Al_Step_01.html"
                  title="Kolay AL-Sat"
                  rel="bookmark"
                >
                  Kolay AL-Sat
                </a>
                <a
                  className="btn btn-sm btn-secondary"
                  href="Home_Page.html"
                  title="PRO Görünüm"
                  rel="bookmark"
                >
                  PRO Görünüm
                </a>
              </div>
            </div>
            {/* <!-- Head Left --> */}

            {/* <!-- Head Center --> */}
            <div className="header-center col">
              <div className="siteformui">
                <div className="input-group input-group-sm">
                  <div className="input-group-prepend">
                    <span className="input-group-text newslefttxt">
                      Haber & Analiz
                    </span>
                  </div>
                  <div className="newstickerbars form-control">
                    <a
                      className="newstickerbars-item"
                      href="#"
                      title=""
                      data-toggle="modal"
                      data-target="#modalHeadNewsAll"
                    >
                      Murat Alaçayır: 01 - Eylül Veya Ekimde Piyasalar Normale
                      Dönebilir
                    </a>
                    <a
                      className="newstickerbars-item"
                      href="#"
                      title=""
                      data-toggle="modal"
                      data-target="#modalHeadNewsAll"
                    >
                      Murat Alaçayır: 02 - Eylül Veya Ekimde Piyasalar Normale
                      Dönebilir
                    </a>
                    <a
                      className="newstickerbars-item"
                      href="#"
                      title=""
                      data-toggle="modal"
                      data-target="#modalHeadNewsAll"
                    >
                      Murat Alaçayır: 03 - Eylül Veya Ekimde Piyasalar Normale
                      Dönebilir
                    </a>
                    <a
                      className="newstickerbars-item"
                      href="#"
                      title=""
                      data-toggle="modal"
                      data-target="#modalHeadNewsAll"
                    >
                      Murat Alaçayır: 04 - Eylül Veya Ekimde Piyasalar Normale
                      Dönebilir
                    </a>
                    <a
                      className="newstickerbars-item"
                      href="#"
                      title=""
                      data-toggle="modal"
                      data-target="#modalHeadNewsAll"
                    >
                      Murat Alaçayır: 05 - Eylül Veya Ekimde Piyasalar Normale
                      Dönebilir
                    </a>
                  </div>
                  <div className="input-group-append">
                    <a
                      className="input-group-text newsallbtn"
                      href="#"
                      title="Tümü"
                      data-toggle="modal"
                      data-target="#modalHeadNewsAll"
                    >
                      <span>Tümü</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8.207"
                        height="9.414"
                        viewBox="0 0 8.207 9.414"
                      >
                        <g transform="translate(0.707 0.707)">
                          <path
                            d="M8,0,4,4,0,0"
                            transform="translate(3 8) rotate(-90)"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                          />
                          <path
                            d="M8,0,4,4,0,0"
                            transform="translate(0 8) rotate(-90)"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Head Center --> */}

            {/* <!-- Head Right --> */}
            <div className="header-right col-auto">
              <div className="header-right-sett">
                <div className="header-right-sett-theme siteformui">
                  <div className="custom-control custom-switch">
                    <span className="switchthemebg">
                      <svg
                        className="lightsidesvg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14.998"
                        height="29.001"
                        viewBox="0 0 14.998 29.001"
                      >
                        <path
                          d="M11643.852,9771.181v-2.964a.531.531,0,0,1,.166-.386.49.49,0,0,1,.71.044.51.51,0,0,1,.123.336v2.975a.548.548,0,0,1-.129.34l-.035.035a.486.486,0,0,1-.339.14A.51.51,0,0,1,11643.852,9771.181Zm-10.083-3.926a.489.489,0,0,1-.474-.531.508.508,0,0,1,.152-.327l2.1-2.1a.554.554,0,0,1,.333-.152l.05,0a.489.489,0,0,1,.336.141.509.509,0,0,1-.015.719l-2.1,2.1a.544.544,0,0,1-.378.155Zm-2.4-9.454a.525.525,0,0,1-.383-.166.489.489,0,0,1,.041-.71.522.522,0,0,1,.336-.123h2.976a.553.553,0,0,1,.342.126l.035.037a.5.5,0,0,1,.137.34.508.508,0,0,1-.52.5Zm5.176-7.7v0l-2.093-2.093a.528.528,0,0,1-.154-.392.489.489,0,0,1,.531-.471.516.516,0,0,1,.325.149l0,0,2.1,2.1a.533.533,0,0,1,.149.33v.053a.48.48,0,0,1-.488.477A.533.533,0,0,1,11636.545,9750.1Zm7.307-2.92v-2.966a.528.528,0,0,1,.166-.383.49.49,0,0,1,.71.041.52.52,0,0,1,.123.336v2.975a.552.552,0,0,1-.129.342l-.035.035a.492.492,0,0,1-.339.138A.507.507,0,0,1,11643.852,9747.181Z"
                          transform="translate(-11630.353 -9743.199)"
                          fill=""
                          stroke="rgba(0,0,0,0)"
                          strokeMiterlimit="10"
                          strokeWidth="1"
                        />
                      </svg>
                      <svg
                        className="darksidesvg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16.015"
                        height="29.106"
                        viewBox="0 0 16.015 29.106"
                      >
                        <path
                          id="DarkSide"
                          d="M11631.611,9771.473v-.608l-.587-.189a.206.206,0,0,1-.158-.149c0-.006,0-.015-.006-.021a.233.233,0,0,1,.164-.283l.587-.19v-.607a.235.235,0,0,1,.1-.19l.006,0a.235.235,0,0,1,.324.059l.371.494.591-.192a.264.264,0,0,1,.213.037.147.147,0,0,1,.035.023v0a.21.21,0,0,1,.023.3l-.351.476.351.494a.2.2,0,0,1,.041.208v.009h0a.239.239,0,0,1-.31.143l-.588-.189-.371.494a.269.269,0,0,1-.2.1h0c-.021,0-.038,0-.038.018A.227.227,0,0,1,11631.611,9771.473Zm6.708-3.049v-.83l-.8-.26a.286.286,0,0,1-.217-.207.086.086,0,0,1-.006-.026.315.315,0,0,1,.223-.389l.8-.261v-.83a.316.316,0,0,1,.135-.26l.006-.006a.323.323,0,0,1,.443.082l.512.678.8-.26a.37.37,0,0,1,.293.053.214.214,0,0,1,.04.025.3.3,0,0,1,.041.415l-.479.649.481.675a.277.277,0,0,1,.053.287v.011a.331.331,0,0,1-.424.2l-.8-.26-.509.675a.374.374,0,0,1-.266.132l0-.006c-.026,0-.053,0-.053.023A.31.31,0,0,1,11638.319,9768.424Zm4.775-8.64-.43-1.273-1.364-.026a.328.328,0,0,1-.267-.129l-.026-.038a.3.3,0,0,1,.105-.406l1.128-.78-.4-1.248a.354.354,0,0,1,.053-.286l.012-.015a.319.319,0,0,1,.444-.062l1.1.777,1.126-.777a.3.3,0,0,1,.295-.053l.026.006,0,0a.315.315,0,0,1,.184.406l-.453,1.271,1.1.81a.313.313,0,0,1,.134.26.35.35,0,0,1-.348.311h-1.37l-.43,1.273a.333.333,0,0,1-.267.208h-.023v0A.34.34,0,0,1,11643.095,9759.784Zm-4.849-9.812v-.833l-.8-.26a.287.287,0,0,1-.216-.207l-.009-.026a.318.318,0,0,1,.225-.389l.8-.261v-.83a.32.32,0,0,1,.135-.26l.006-.006a.324.324,0,0,1,.444.085l.511.675.8-.266a.377.377,0,0,1,.3.053c.015.009.029.021.044.031l0,0a.289.289,0,0,1,.031.409l-.481.649.481.675a.278.278,0,0,1,.053.287v.012a.328.328,0,0,1-.424.2l-.8-.26-.511.678a.38.38,0,0,1-.264.129h-.006c-.026,0-.053,0-.053.026A.31.31,0,0,1,11638.246,9749.973Zm-6.635-3.989v-.607l-.587-.19a.214.214,0,0,1-.158-.152c0-.006,0-.012-.006-.018a.236.236,0,0,1,.164-.286l.587-.189v-.605a.241.241,0,0,1,.1-.192l.006,0a.237.237,0,0,1,.324.061l.371.494.591-.2a.272.272,0,0,1,.213.038l.035.023v0a.209.209,0,0,1,.023.3l-.351.477.351.493a.205.205,0,0,1,.041.211v.006l0,0a.242.242,0,0,1-.31.144l-.588-.19-.371.494a.278.278,0,0,1-.2.094h0c-.021,0-.038,0-.038.021A.23.23,0,0,1,11631.611,9745.983Z"
                          transform="translate(-11630.339 -9743.162)"
                          fill=""
                          stroke="rgba(0,0,0,0)"
                          strokeMiterlimit="10"
                          strokeWidth="1"
                        />
                      </svg>
                    </span>
                    <input
                      id="headThemeColor"
                      className="custom-control-input"
                      type="checkbox"
                      checked
                    />
                    <label
                      htmlFor="headThemeColor"
                      className="custom-control-label"
                    ></label>
                  </div>
                </div>
                <div className="header-right-sett-icns">
                  <a
                    className="headsetticon fullscreen"
                    href="#"
                    title="Tam Sayfa Görünümü"
                    data-toggle="fullscreenbtn"
                  >
                    <i className="icon-sprtsmiconclrd icon20 sm-pagefullscreen hide"></i>
                  </a>
                </div>
              </div>
              <div className="header-right-notsignedin d-none">
                <div className="header-right-notsignedin-btn">
                  <a
                    className="btn btn-sm btn-secondary"
                    href="#"
                    title="Üye Girişi"
                    data-toggle="modal"
                    data-target="#modalHeadSignIn"
                  >
                    Üye Girişi
                  </a>
                  <a
                    className="btn btn-sm btn-success"
                    href="#"
                    title="Kayıt Ol"
                    data-toggle="modal"
                    data-target="#modalHeadSignUp"
                  >
                    Kayıt Ol
                  </a>
                </div>
              </div>
              <div className="header-right-signedin">
                <div className="header-right-signedin-icns">
                  <a
                    className="headsignedinicon support"
                    href="#"
                    title="Destek"
                    rel="bookmark"
                  >
                    <i className="icon-sprtsmiconclrd icon20 sm-support"></i>
                  </a>
                  <a
                    className="headsignedinicon notif"
                    href="#"
                    data-toggle="modal"
                    data-target="#modalHeadNotifications"
                  >
                    <span
                      title="4 Yeni Bildiriminiz Var"
                      data-toggle="tooltip"
                      data-placement="bottom"
                    >
                      <i className="icon-sprtsmiconclrd icon20 sm-notif"></i>
                      <span className="badge badge-pill badge-danger">4</span>
                    </span>
                  </a>
                </div>
                <div className="header-right-signedin-user">
                  <a
                    className="useraccountarea"
                    href="#"
                    title="Hesabım"
                    data-toggle="modal"
                    data-target="#modalHeadUserMenu"
                  >
                    <div className="useraccountarea-avatar rounded-pill">
                      <i className="icon-sprtbgiconclrd icon50gray bg-user"></i>
                      <img src={UnknownProfileAvatar} alt="" />
                    </div>
                    <h3 className="useraccountarea-name">Murat ALAÇAYIR</h3>
                    <i className="siteiconsdropdown downdirection"></i>
                  </a>
                </div>
              </div>
              <div className="header-right-lang">
                <a
                  className="btn btn-sm btn-secondary active"
                  href="#"
                  title="TR"
                  rel="bookmark"
                >
                  TR
                </a>
                <a
                  className="btn btn-sm btn-secondary"
                  href="#"
                  title="EN"
                  rel="bookmark"
                >
                  EN
                </a>
              </div>
            </div>
            {/* <!-- Head Right --> */}
          </div>
        </div>
      </header>
    </Fragment>
  );
}

export default App;
