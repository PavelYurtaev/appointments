import React, { Component } from 'react';
import './App.css';
import CustomTable from './components/CustomTable';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import FileDownload from '@material-ui/icons/FileDownload';

class App extends Component {
  render() {
    return (
        <div>

                <Button variant="fab" color="primary" aria-label="add" >
                    <AddIcon />
                </Button>
                <Button variant="contained" color="default">
                    CSV
                    <FileDownload />
                </Button>


            <CustomTable />
           <br/>
          Confirmed: // TODO change style for confirmed appointments
            <CustomTable />
        </div>

    );
  }
}

export default App;
