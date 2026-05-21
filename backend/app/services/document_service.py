from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
import uuid
import os
from config import config

class DocumentService:
    def generate_ats_resume(self, resume_data: dict) -> Document:
        """Generate ATS-optimized Word document"""
        doc = Document()

        # Set default font
        style = doc.styles['Normal']
        style.font.name = 'Calibri'
        style.font.size = Pt(11)

        # Header - Name
        name_para = doc.add_paragraph(resume_data.get("name", "Your Name"))
        name_para.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
        name_para_format = name_para.runs[0]
        name_para_format.font.size = Pt(14)
        name_para_format.font.bold = True

        # Contact Info
        contact = f"{resume_data.get('email', '')} | {resume_data.get('phone', '')} | {resume_data.get('location', '')}"
        contact_para = doc.add_paragraph(contact)
        contact_para.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
        contact_para.space_after = Pt(12)

        # Professional Summary
        if resume_data.get("summary"):
            doc.add_heading("PROFESSIONAL SUMMARY", level=2)
            doc.add_paragraph(resume_data["summary"])
            doc.paragraphs[-1].space_after = Pt(12)

        # Professional Experience
        if resume_data.get("experience"):
            doc.add_heading("PROFESSIONAL EXPERIENCE", level=2)
            for exp in resume_data["experience"]:
                title_para = doc.add_paragraph(exp.get("title", ""))
                title_para.runs[0].font.bold = True
                title_para.space_after = Pt(0)

                company_para = doc.add_paragraph(
                    f"{exp.get('company', '')} | {exp.get('duration', '')}"
                )
                company_para.runs[0].italic = True
                company_para.space_after = Pt(6)

                doc.add_paragraph(exp.get("description", ""))
                doc.paragraphs[-1].space_after = Pt(12)

        # Education
        if resume_data.get("education"):
            doc.add_heading("EDUCATION", level=2)
            for edu in resume_data["education"]:
                degree_para = doc.add_paragraph(edu.get("degree", ""))
                degree_para.runs[0].font.bold = True
                degree_para.space_after = Pt(0)

                doc.add_paragraph(
                    f"{edu.get('school', '')} | Graduated {edu.get('year', '')}"
                )
                doc.paragraphs[-1].space_after = Pt(12)

        # Skills
        if resume_data.get("skills"):
            doc.add_heading("SKILLS", level=2)
            skills_text = " • ".join(resume_data["skills"])
            doc.add_paragraph(skills_text)

        return doc

    async def save_resume(self, doc: Document, file_name: str = None) -> dict:
        """Save Word document to disk"""
        try:
            os.makedirs(config.UPLOAD_DIR, exist_ok=True)

            resume_id = str(uuid.uuid4())
            file_name = file_name or f"{resume_id}.docx"
            file_path = os.path.join(config.UPLOAD_DIR, file_name)

            doc.save(file_path)

            return {
                "id": resume_id,
                "file_path": file_path,
                "file_name": file_name,
                "download_url": f"/api/download/{resume_id}",
            }
        except Exception as e:
            raise Exception(f"Failed to save resume: {str(e)}")

# Create singleton instance
document_service = DocumentService()
