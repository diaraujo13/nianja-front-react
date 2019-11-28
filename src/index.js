import React, { useState } from "react";
import ReactDOM from "react-dom";
import Box from "@material-ui/core/Box";
import {
  Container,
  Paper,
  Grid,
  AppBar,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Icon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const select_options = [
  "text",
  "email",
  "password",
  "textarea",
  "integer",
  "float",
  "date",
  "time",
  "file",
  "photo",
  "hasOneRelationship",
  "hasManyRelationship",
  "pick",
  "radio",
  "cidade"
];

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      objetos: [],
      attrs: []
    };
  }

  _handleChange = (key, index) => event => {
    this.setState({
      attrs: this.state.attrs.map((s, _idx) => {
        if (_idx !== index) return s;

        let {
          target: { value }
        } = event;
        let tmp = s;
        tmp[key] = value;

        return tmp;
      })
    });
  };

  _handleCheckbox = (key, index) => event => {
    this.setState({
      attrs: this.state.attrs.map((s, _idx) => {
        if (_idx !== index) return s;

        let {
          target: { checked }
        } = event;
        let tmp = s;
        tmp[key] = checked;

        return tmp;
      })
    });
  };

  render() {
    let basicObject = {
      name: "",
      displayName: "",
      tooltipText: "",
      required: false,
      typeName: "text",
      values: [],
      showOnListView: false,
      showOnDetails: false,

      relationshipEntity: ""
    };

    return (
      <div>
        <AppBar style={{ padding: 10 }} position="static">
          <Typography variant="h6" noWrap>
            Nianja - Code Generator
          </Typography>
        </AppBar>
        <Container maxWidth="sm">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Cabeçalho */}
              <h1> Componente #1 </h1>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  this.setState({ attrs: [...this.state.attrs, basicObject] })
                }
                startIcon={<Icon>add</Icon>}
              >
                ADICIONAR
              </Button>
            </Grid>

            {this.state.attrs.map((el, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  style={{
                    marginBottom: 7,
                    backgroundColor: "#e0e0e0",
                    borderRadius: 10
                  }}
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  {/* <h5> Adicionar nova coluna </h5> */}
                  <Grid
                    direction="row"
                    container
                    item
                    alignItems="center"
                    justify="space-between"
                  >
                    <TextField
                      id="name"
                      value={this.state.attrs[index].name}
                      onChange={this._handleChange("name", index)}
                      label="Column name"
                      type="search"
                      margin="normal"
                    />

                    <TextField
                      id="standard-search"
                      value={this.state.attrs[index].displayName}
                      onChange={this._handleChange("displayName", index)}
                      label="Display name"
                      type="search"
                      margin="normal"
                    />

                    <TextField
                      id="standard-search"
                      onChange={this._handleChange("tooltipText", index)}
                      value={this.state.attrs[index].tooltipText}
                      label="Tooltip descr"
                      type="search"
                      margin="normal"
                    />
                  </Grid>

                  <Grid
                    spacing={13}
                    direction="row"
                    container
                    item
                    alignItems="center"
                    justify="space-between"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this._handleCheckbox("required", index)}
                          value={this.state.attrs[index].required }
                        />
                      }
                      label="Obrigatório"
                    />

                    <FormControl displayEmpty style={{ minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-label">
                        Column type
                      </InputLabel>
                      <Select
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                      >
                        {select_options.map((el, index) => (
                          <MenuItem value={index}>{el}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      id="standard-search"
                      label="Tooltip descr"
                      type="search"
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              );
            })}

            <Grid item xs={6}>
              <h2>Componentes</h2>
            </Grid>
            <Grid item xs={6}>
              <h2>JSON </h2>
              <p>{JSON.stringify(this.state.attrs, null, "\t")}</p>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(<App />, document.getElementById("root"));
