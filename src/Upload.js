import "./Upload.css";

function Upload({ text, onUpload }) {
    const button = <input type="file" onInput={onUpload} id="uploadFile" name="uploadFile" accept=".csv" />;
    return <div className="upload-container">
        {button}
    </div>;
}

export default Upload;