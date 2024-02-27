import { useState } from 'react';
import './App.css';
import Configuration from './Configuration';
import Files from './Files.js';
import Upload from './Upload';
import { parse } from './Parse';
import JSZip from 'jszip';

function App() {

  const [configuration, onConfigurationChange] = useState({
    maxLines: 100,
  });

  const [files, onFilesChange] = useState({
    names: [],
  });

  const onUpload = (e) => {
    let file = e.target.files[0];
    if (file && file.name) {
      parse(file, (blobs) => { onParse(blobs, file.name) }, configuration.maxLines);
    } else {
      console.log("Invalid file");
    }
  };

  const onParse = (blobs, fileName) => {
    let count = 0;
    let names = [];
    let zip = new JSZip();
    for (let i = 0; i < blobs.length; i++) {
      count += 1;
      let name = fileName.replace(/.csv$/, `-${count}.csv`);
      zip.file(name, blobs[i]);
      names.push(name);
    }
    onFilesChange({
      names: names,
    });
    zip.generateAsync({ type: "blob" }).then(content => saveAs(content, `${fileName}.zip`));
  };

  const saveAs = (file, fileName) => {
    let link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Configuration currentConfiguration={configuration} onConfigurationChange={onConfigurationChange} />
        <Upload text="Upload CSV" onUpload={onUpload} />
      </header>
      <main className="App-main">
        <Files files={files.names} />
      </main>
    </div>
  );
}

export default App;
