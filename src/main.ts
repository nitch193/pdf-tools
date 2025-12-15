import "./style.css";
import printJS from "print-js";



(function () {
  const fileInput = document.getElementById("pdf-input") as HTMLInputElement;
  const iFrameElement = document.getElementById("iframe-pdf") as HTMLIFrameElement;
  const objectElement = document.getElementById('pdf') as HTMLObjectElement;
  const printbtn = document.getElementById('print') as HTMLButtonElement;
  const passwordContainer = document.getElementById('password-container') as HTMLDivElement;
  const passwordInput = document.getElementById('password-input') as HTMLInputElement;
  const submitPasswordBtn = document.getElementById('submit-password') as HTMLButtonElement;
  const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

  let currentFile: File | null = null;

  if (fileInput) {
    fileInput.onchange = async (ev) => {
      const input_element = ev.target as HTMLInputElement;
      if (input_element.files && input_element.files.length) {
        currentFile = input_element.files[0];
        passwordContainer.style.display = 'none';
        errorMessage.style.display = 'none';
        printbtn.style.display = 'none';
        iFrameElement.src = "";
        objectElement.data = "";

        await tryLoadPdf(currentFile, undefined);
      }
    };
  }

  submitPasswordBtn.addEventListener('click', async () => {
    if (currentFile) {
      errorMessage.style.display = 'none';
      await tryLoadPdf(currentFile, passwordInput.value.trim());
    }
  });

  async function tryLoadPdf(file: File, password?: string) {
    const arrayBuffer = await file.arrayBuffer();

    try {
      // Dynamically import pdf-lib to reduce initial bundle size
      const { PDFDocument } = await import('@cantoo/pdf-lib');

      // Try to load the document
      // If it's encrypted, this will throw unless the correct password is provided (or if it has no user password)
      // Note: pdf-lib's load method handles both encryption detection and decryption if password is provided.
      // If we attempt to load an encrypted PDF without a password, or with the wrong one, it throws.

      // @ts-ignore
      const pdfDoc = await PDFDocument.load(arrayBuffer, { password });

      // If we get here, the PDF is loaded and unlocked.
      // We essentially "remove" the password by saving it again without encryption settings
      // (Default save is unencrypted unless standard/owner permissions are set explicitly)

      const pdfBytes = await pdfDoc.save();
      const pdfBase64 = uint8ArrayToBase64(pdfBytes);
      const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;

      iFrameElement.src = `${pdfDataUrl}#toolbar=0`;
      objectElement.data = pdfDataUrl;

      // UI Updates
      passwordContainer.style.display = 'none';
      printbtn.style.display = 'block';
      passwordInput.value = ''; // clear password

      // Update print button to print the UNLOCKED content
      printbtn.onclick = () => {
        printJS({
          printable: pdfBase64,
          type: 'pdf',
          base64: true
        })
      };

    } catch (error: any) {
      console.error("PDF Load Error:", error);
      console.log("Attempted password length:", password ? password.length : "undefined");

      const errStr = (error.message || error.toString()).toLowerCase();
      if (errStr.includes('password') || errStr.includes('encrypted')) {

        // If we ALREADY tried a password and it failed
        if (password !== undefined) {
          errorMessage.textContent = "Incorrect Password (or encryption not supported)";
          errorMessage.style.display = 'block';
        } else {
          // Show password prompt for the first time
          passwordContainer.style.display = 'block';
        }
      } else {
        alert("Error loading PDF: " + error.message);
      }
    }
  }

  function uint8ArrayToBase64(uint8Array: Uint8Array): string {
    let binary = '';
    const len = uint8Array.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    return window.btoa(binary);
  }

})();
