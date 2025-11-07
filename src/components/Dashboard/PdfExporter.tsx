import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import useIsMobile from "../../hooks/useIsMobile";
import FuelReport from "../../chartjs/Dashboard/ReportCharts/FuelReport";
import MaintenanceReport from "../../chartjs/Dashboard/ReportCharts/MaintenanceReport";
import ExpenseBreakdown from "../../chartjs/Dashboard/ReportCharts/ExpenseBreakdown";
import type { UserInfo } from "../../App";

type PdfExporterProps = {
    isDark: boolean;
    user: UserInfo | null;
}

function PdfExporter({ isDark, user }: PdfExporterProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();

    const handleExportPdf = async () => {
        const input = contentRef.current;
        if (!input) return;
      
        window.scrollTo(0, 0);

        const canvas = await html2canvas(input, {
          scale: 2,
          useCORS: true,
          windowWidth: input.scrollWidth,
          windowHeight: input.scrollHeight,
        });
      
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
      
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
      
        const imgWidthPx = canvas.width;
        const imgHeightPx = canvas.height;
      
        const pageWidthPx = pdfWidth * (canvas.width / imgWidthPx);
        const pageHeightPx = (canvas.height * pdfWidth) / canvas.width;

        if(imgHeightPx && pageWidthPx && pageHeightPx){}
      
        let renderWidth = pdfWidth;
        let renderHeight = (canvas.height * pdfWidth) / canvas.width;
      
        if (renderHeight > pdfHeight) {
          const scaleFactor = pdfHeight / renderHeight;
          renderWidth *= scaleFactor;
          renderHeight = pdfHeight;
        }
      
        const x = (pdfWidth - renderWidth) / 2;
        const y = (pdfHeight - renderHeight) / 2;
      
        pdf.addImage(imgData, "PNG", x, y, renderWidth, renderHeight);
        pdf.save("Report&Analytics.pdf");
};               

  return (
    <div className="h-full w-full flex flex-col items-start justify-start">

        <div className="w-full flex flex-row items-center justify-between">
            <span className="text-[calc(0.6vw+1rem)] font-semibold cursor-pointer hovered">Reports & Analytics</span>
            <span onClick={handleExportPdf} className={`${isMobile? "text-[calc(0.4vw+0.6rem)]" : "text-[calc(0.4vw+0.5rem)]"}
                flex flex-row items-center justify-center rounded-md cursor-pointer text-[var(--light-color)] 
                bg-[var(--purple-color)] px-[calc(0.4vw+0.6rem)] py-[calc(0.3vw+0.4rem)] gap-[calc(0.2vw+0.3rem)]`}>
                <i className='bx bx-arrow-out-down-left-square bx-tada-hover text-[calc(0.4vw+0.8rem)]'></i> 
                Export to PDF
            </span>
        </div>

        <div ref={contentRef} className={`${isMobile? "flex-col" : "flex-row"}
            flex-1 h-auto w-full flex items-start justify-start 
            p-[calc(0.4vw+0.6rem)] gap-[calc(0.4vw+0.6rem)]`}>

            <div className="h-full w-full flex flex-col items-start justify-between gap-[calc(0.4vw+0.6rem)]">
                <div className={`${isMobile? "h-[260px]" : "flex-1"}
                    w-full flex flex-col items-center justify-center`}>
                    <FuelReport isDark={isDark} user={user} />
                </div>
                <div className={`${isMobile? "h-[260px]" : "flex-1"}
                    w-full flex flex-col items-center justify-center`}>
                    <MaintenanceReport isDark={isDark} user={user} />
                </div>
            </div>

            <div className="h-full w-full flex flex-col items-center justify-center gap-[calc(0.4vw+0.6rem)]">
                <div className={`${isMobile? "h-[300px]" : "h-[360px]"}
                    w-full flex flex-col items-center justify-center`}>
                    <ExpenseBreakdown isDark={isDark} user={user} />
                </div>
            </div>

        </div>
    </div>
  );
}

export default PdfExporter;
