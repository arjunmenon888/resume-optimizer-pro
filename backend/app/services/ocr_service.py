from PIL import Image
import io

class OCRService:
    def __init__(self):
        # Lazy-init: reader is created on first use so the server
        # starts even when easyocr/torch are not yet installed.
        self._reader = None

    def _get_reader(self):
        if self._reader is None:
            import easyocr
            self._reader = easyocr.Reader(['en'])
        return self._reader

    async def extract_from_image(self, file_path: str) -> str:
        """Extract text from image using EasyOCR"""
        try:
            result = self._get_reader().readtext(file_path)
            text = "\n".join([item[1] for item in result])
            return text
        except Exception as e:
            raise Exception(f"OCR extraction failed: {str(e)}")

    async def extract_from_file(self, file_path: str, mime_type: str) -> str:
        """Extract text from image or PDF"""
        if mime_type.startswith("image/"):
            return await self.extract_from_image(file_path)
        elif mime_type == "application/pdf":
            raise NotImplementedError("PDF extraction requires pypdf. For now, use images.")
        else:
            raise ValueError(f"Unsupported file type: {mime_type}")

# Create singleton instance
ocr_service = OCRService()
