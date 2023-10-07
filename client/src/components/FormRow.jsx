
const FormRow = ({ type, name, labelText, defaultValue = '', value, onChange }) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>{labelText || name}</label>
            <input type={type} id={name} name={name} className='form-input' defaultValue={defaultValue} value={value} onChange={onChange} required />
        </div>
    )
}

export default FormRow
