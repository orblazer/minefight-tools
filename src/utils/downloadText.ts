export default function downloadText(content: string, filename: string) {
  // Create file
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
  element.setAttribute('download', filename)

  // Add to body for work on Firefox
  element.style.display = 'none'
  document.body.appendChild(element)

  // Automatically click on the link
  element.click()

  // Remove the link from body
  document.body.removeChild(element)
}
