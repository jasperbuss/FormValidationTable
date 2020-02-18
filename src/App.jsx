import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MyTable from './components/ListComponent';
import { Button } from "@material-ui/core";
import useStyles from './styles';
import FormValidation from './components/Validation';
const routes = [
  {
    path: "/",
    id:1,
    exact: true,
    main: () => <MyTable/>
  },
  {
    path: "/validation",
    id:2,
    exact: true,
    main: () => <FormValidation/>
  },
];

export default function App() {
 const classes = useStyles();
  return (
    <Router>
      <div style={{ display: "flex" }}>
            <Button className={classes.btnStyles} >
              <Link className={classes.linkStyles} to="/">Table</Link>
            </Button>
            <Button style={{background:"darkgrey"}}>
              <Link className={classes.linkStyles} to="/validation">Validation</Link>
            </Button>
        </div>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
    </Router>
  );
}

