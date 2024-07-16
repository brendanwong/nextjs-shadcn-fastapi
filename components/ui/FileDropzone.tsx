import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

interface DropzoneProps {
    file: string | ArrayBuffer | null
    setFile: (file: string | ArrayBuffer) => void

}
export function FileDropzone({file, setFile}: DropzoneProps) {
    const [fileName, setFileName] = useState<string>('')
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            setFileName(file.name)

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const blob = reader.result
                console.log('blob:', blob)

                setFile(blob)

            }
            reader.readAsDataURL(file)
        })

    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps({ multiple: false, accept: "image/.png" })} />

            {file ? (
                <p>File: {fileName}</p>
            ) : (
                <p>Drag and drop a file here, or click to select file</p>
            )}
        </div>
    )
}
