export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

function base64ToBlob(base64: string): Blob {
  const [prefix, base64Data] = base64.split(",")
  const byteString = atob(base64Data)
  const mimeString = prefix.split(":")[1].split(";")[0]

  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  return new Blob([arrayBuffer], { type: mimeString })
}

function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type })
}

export function base64ToFile(base64: string, fileName: string): File {
  const blob = base64ToBlob(base64)
  return blobToFile(blob, fileName)
}
