
const items = [
  "Murat Alaçayır: 01 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 02 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 03 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 04 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 05 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
];

const HeaderCenter = props => {
  return (
    <div className="header-center col">
      <div className="newstickerbars siteformui">
        <div className="input-group input-group-sm">
          <div className="input-group-prepend">
            <span className="input-group-text newslefttxt">Haber & Analiz</span>
          </div>
          <div className="newstickerbars-box form-control">
            {items.map((item, idx) => {
              return (
                  <a
                      key={idx}
                      className="newstickerbars-item"
                      href="#"
                      title=""
                      data-toggle="modal"
                      data-target="#modalHeadNewsAll"
                  >
                    {item}
                  </a>
              );
            })}
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
              <i className="icon-sprtsmiconclrd icon14 sm-arrowmore"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCenter;
