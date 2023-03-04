import {useDocumentTitle, useScrollTop} from "../../hooks";
import {withRouter} from "react-router-dom";

const Home = () => {
    useDocumentTitle('Home');
    useScrollTop();

    return(
        <h1>This is Home</h1>
    );
};

export default withRouter(Home);