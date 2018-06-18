import React, { Component } from 'react';
import './App.css';
import CustomTable from './components/CustomTable';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import FileDownload from '@material-ui/icons/FileDownload';
import { apiUrl } from "./utils/Request";

class App extends Component {
  render() {
    return (
        <div>
            <Button variant="fab" color="primary" aria-label="add" >
                <AddIcon />
            </Button>
            &ensp;
            <Button variant="contained" color="default" href={apiUrl('csv')}>
                CSV
                <FileDownload />
            </Button>
            <CustomTable />
           <br/>
          Confirmed:
            {/*<CustomTable />*/}
        </div>
// TODO change style for confirmed appointments
    );
  }
}

export default App;
