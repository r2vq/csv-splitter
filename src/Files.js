import "./Files.css";

function Files({ files }) {
    const summary = <div className="files-summary">
        Your zip file is downloading.
    </div>;

    const empty = <div className="files-empty">
        Click "Choose File"
    </div>

    return <div className="files-list">
        {(files && files.length > 0) ? summary : empty}

        {files.map((file, i) => {
            return <div className="file" key={file}>{file}</div>
        })}
    </div>
}

export default Files;