import './Configuration.css';

function Configuration({ currentConfiguration, onConfigurationChange }) {
    const onMaxLinesChange = (e) => onConfigurationChange({ maxLines: parseInt(e.target.value) });
    return <div>
        <label className="configuration-label">
            Records Per File:
            <input
                className="configuration-input"
                value={currentConfiguration.maxLines}
                onChange={onMaxLinesChange}
            />
        </label>
    </div>;
}

export default Configuration;