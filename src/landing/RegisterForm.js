import React, { Component } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  Link
} from "@material-ui/core";
import PrivacyPage from "../info/PrivacyPage";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      agree: false,
      openPolicy: false,
      policyError: false
    };
  }

  handleClickOpenForm = () => {
    this.setState({ openForm: true });
  };

  handleCloseForm = () => {
    this.setState({ openForm: false });
  };

  handleAgreePolicy = event => {
    this.setState({ agree: event.target.checked });
    if (event.target.checked) {
      this.setState({ policyError: false });
    }
  }

  handleClickOpenPolicy = () => {
    this.setState({ openPolicy: true });
  };

  handleClosePolicy = () => {
    this.setState({ openPolicy: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    // check password match
    
    
    // check policy agreed
    if (!this.state.agree) {
      this.setState({ policyError: true });
    }

    // create User in firebase
    console.log(document.getElementById("username").value);
    console.log(document.getElementById("password").value);
    this.handleCloseForm();
  }

  render() {
    return (
      <Grid item>
        <Button
          color="default"
          variant="contained"
          onClick={this.handleClickOpenForm}
        >Register</Button>
        <Dialog
          open={this.state.openForm}
          onClose={this.handleCloseForm}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Register</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing="16">
              <Grid item sm={12} md={12} lg={12}>
                <FormControl margin="normal" fullWidth>
                  <InputLabel>Username</InputLabel>
                  <Input id="username" />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl margin="normal" fullWidth>
                  <InputLabel>Password</InputLabel>
                  <Input id="password" type="password" />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl margin="normal" fullWidth>
                  <InputLabel>Reenter password</InputLabel>
                  <Input id="password2" type="password" />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.agree}
                      onChange={this.handleAgreePolicy}
                    />
                  }
                  label={
                    <p>I accept the&nbsp;
                      <Link
                        component="button"
                        onClick={this.handleClickOpenPolicy}
                        style={{ fontSize: "1em" }}
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  }
                />
                {this.state.policyError ? (
                  <FormHelperText error={true}>You have to accept the privacy policy.</FormHelperText>
                ) : ""}
                <Dialog
                  open={this.state.openPolicy}
                  onClose={this.handleClosePolicy}
                  maxWidth="md"
                  fullWidth
                  
                >
                  <DialogContent className="privacy-in-dialog">
                    <PrivacyPage />
                  </DialogContent>
                </Dialog>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

export default RegisterForm;