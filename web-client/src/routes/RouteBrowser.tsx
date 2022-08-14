import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CircularProgress } from "@material-ui/core";
import { ContextState } from '../context/DataProvider';


/* lazy components */
const Login = lazy(()=> import("../resources/views/Auth/Login"));
const Register = lazy(()=> import("../resources/views/Auth/Register"));
const Chat = lazy(()=> import("../resources/views/Chat"));

export default function RouteBrowser() {
    const state: any = useContext(ContextState);

    React.useEffect(()=>{
        /* console.log(state); */
    }, [state])

    return (
        <Router>
            <Suspense fallback={<div><div className="vh-100 d-flex justify-content-center align-items-center"><CircularProgress /></div></div>}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/chat" component={Chat} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </Suspense>
        </Router>
    )
}
