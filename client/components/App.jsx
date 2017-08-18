import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export default class App extends Component {
    constructor() {
        super();
        this.state = { files: [] };
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(files) {
        this.setState({ 
            files
        });
    }

    render() {
        return (
            <section>
                <div>
                    <Dropzone onDrop={this.onDrop}>
                        <p>Try dropping some files here or click files to upload</p>
                    </Dropzone>
                </div>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>
                        {
                            this.state.files.map((f, i) => <li key={i}>{f.name} - {f.size} bytes</li>)
                        }
                    </ul>
                </aside>
            </section>
        )
    }
}