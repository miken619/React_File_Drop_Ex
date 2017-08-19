import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'xdbilvan';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dnlk126yf/upload';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploadedFileCloudinaryUrl: '',
            uploadedFile: null
        };
        this.onImageDrop = this.onImageDrop.bind(this);
    }
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url                 
                });

                 console.log(response.body);
            }
        });
    }

    render() {
        return (
            <section>
                <div>
                    <Dropzone onDrop={this.onImageDrop}>
                        <p>Try dropping some files here or click files to upload</p>
                    </Dropzone>
                </div>
                <div>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                        <div>
                            <p>{this.state.uploadedFile.name}</p>
                            <a href={this.state.uploadedFileCloudinaryUrl} download><img src={this.state.uploadedFileCloudinaryUrl} /></a>
                        </div>}
                </div>
            </section>
        )
    }
}