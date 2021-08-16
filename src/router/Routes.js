import React from 'react'
import { BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
import { UsuarioScreen } from '../screen/Usuario';
import { Usuarios } from '../screen/Usuarios';
export const Routes = () => {
    return (
        <Router>
            <div>
                <div className="container mt-2">
                    <Switch>
                        <Route exact path="/usuarios" component={Usuarios}/>
                        <Route exact path="/usuarios/:usuarioId" component={UsuarioScreen}/>
                        <Redirect to ="/usuarios"/>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
