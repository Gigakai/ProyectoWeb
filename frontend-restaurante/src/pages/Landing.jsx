import Billboard from "../Components/Billboard.jsx";
import Dashboard from "../Components/Dashboard.jsx";

function Landing() {
    return (

        <main>
            <div id="Billboard">
                <Billboard/>
            </div>

            <div>
                <Dashboard/>
            </div>

        </main>
    )
}


export default Landing;