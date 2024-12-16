import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['image', 'video'],
            ['clean'],
        ],
    };

    // Ensuring the onChange function is passed correctly
    return (
        <ReactQuill
            value={value}
            theme="snow"
            onChange={(content) => onChange(content)} // Ensure this onChange properly updates the parent state
            style={{ marginTop: '20px' }}
            modules={modules}
        />
    );
}
