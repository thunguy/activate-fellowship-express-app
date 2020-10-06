import React from "react";
import "./css/App.css";
import GroupSelect from "./GroupSelect";
import ActivateUsersButton from "./ActivateUsersButton";
import DataDisplay from "./DataDisplay";
import AlertDismissible from "./Alert"
import * as api from "./api";
import { Grid } from '@material-ui/core';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupInfo: [],
      errorMessage: "",
      users: []
    };
  }

  async componentDidMount() {
    this.setState({
      groupInfo: await api.listGroups(),
    });
  }

  async handleCheckedUser(event) {
    const user = this.state.users.find((user) => user.id === Number(event.target.value));
    user.checked = event.target.checked;
    return this.setState({
      users: this.state.users,
      errorMessage: ""
    })
  }

  async handleActivate() {
    try {
      const activatedUsers = await api.activateUsers(this.state.users);
      const updatedUsers = this.state.users.map((user) => activatedUsers.find((activatedUser) => activatedUser.id === user.id) || user);

      this.setState({
        users: updatedUsers,
        errorMessage: ""
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message
      })
    }
  }

  async handleGroupSelect(groupId) {
    this.setState({
      users: await api.listUsers(groupId),
      groupId: groupId,
      errorMessage: ""
    });
  }

  render() {

    const ActivateUsersDisplay = () => {
      return (
        <div>
          <Grid item xs>
            {this.state.groupId && <DataDisplay
              onChange={(this.handleCheckedUser.bind(this))}
              users={this.state.users}
              // show={!!this.state.groupId}
          />}
          </Grid>
          <Grid item xs>
            {this.state.groupId && <ActivateUsersButton
              onClick={this.handleActivate.bind(this)}
              disabled={!(this.state.users.some((user) => user.checked))}
              // show={!!this.state.groupId}
          />}
          </Grid>
          <Grid item xs>
            <AlertDismissible
              message={this.state.errorMessage}
              onClose={() => this.setState({errorMessage: ""})}
            />
          </Grid>
        </div>
      )
    }

    return (
      <div className="App">
        <div className="control-container">
          <Grid container spacing={2} direction="column" justify="center" alignItems="center">
            <Grid item xs>
              <GroupSelect
                onChange={this.handleGroupSelect.bind(this)}
                groupInfo={this.state.groupInfo}
              />
            </Grid>
            {this.state.groupId && <ActivateUsersDisplay />}
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
