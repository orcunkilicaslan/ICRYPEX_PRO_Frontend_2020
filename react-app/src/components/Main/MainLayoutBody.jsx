import MarketData from "../MarketData/MarketData.jsx";

const MainLayoutBody = props => {
    return (
        <section className="main-body main-h100">
            <div className="container-fluid">
                <div className="row">

                    <aside className="main-body-leftside col-auto">
                        <MarketData />
                    </aside>

                    <section className="main-body-rightcont col"></section>

                </div>
            </div>
        </section>
    );
};

export default MainLayoutBody;