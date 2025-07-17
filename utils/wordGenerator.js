import {
    Document, Paragraph, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, TextRun, PageBreak
} from 'docx';

export const createWordDoc = (form) => {
    const rtl = true;
    const font = "Arial";

    const headerCell = (text, width = 5000) => (
        new TableCell({
            width: { size: width, type: WidthType.DXA },
            children: [new Paragraph({
                children: [new TextRun({
                    text,
                    bold: true,
                    font: font,
                    size: 28// 11pt
                })],
                alignment: AlignmentType.CENTER,
                bidirectional: rtl
            })],
            margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100
            }
        })
    );

    const dataCell = (text, width = 5000) => (
        new TableCell({
            width: { size: width, type: WidthType.DXA },
            children: [new Paragraph({
                children: [new TextRun({
                    text: text || '',
                    font: font,
                    size: 26 // 11pt
                })],
                alignment: AlignmentType.LEFT,
                bidirectional: rtl
            })],
            margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100
            }
        })
    );

    const createTable = (rows) => (
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows,
            borders: {
                top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
            }
        })
    );

    const spacingParagraph = () => (
        new Paragraph({
            children: [new TextRun({ text: "" })],
            spacing: { after: 200 }
        })
    );

    // PAGE 1 - TABLE 1: Project Basic Information (6 rows)
    const basicInfoTable = createTable([
        new TableRow({
            children: [
                headerCell("اسم المشروع / البرنامج", 4320),
                headerCell(" مالك المشروع / البرنامج  )إدارة/قسم( ", 4320)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.projectName, 4320),
                dataCell(form.ownerName, 4320)
            ]
        }),
        new TableRow({
            children: [
                headerCell("مؤشر الأداء المستهدف", 4320),
                headerCell("الهدف الاستراتيجي", 4320)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.performanceIndicator, 4320),
                dataCell(form.strategicObjective, 4320)
            ]
        }),
        new TableRow({
            children: [
                headerCell("القراءة المستهدفة للمؤشر", 4320),
                headerCell("القراءة السابقة للمؤشر", 4320)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.targetReading || "85%", 4320),
                dataCell(form.previousReading || "50%", 4320)
            ]
        })
    ]);

    // PAGE 1 - TABLE 2: Contact Information
    const contactTable = createTable([
        new TableRow({
            children: [
                new TableCell({
                    width: { size: 8640, type: WidthType.DXA },
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: "بيانات التواصل",
                                bold: true,
                                font: font,
                                size: 32
                            })],
                            alignment: AlignmentType.CENTER,
                            bidirectional: rtl
                        })
                    ],
                    columnSpan: 3,
                    margins: {
                        top: 100,
                        bottom: 100,
                        left: 100,
                        right: 100
                    }
                })
            ]
        }),
        new TableRow({
            children: [
                headerCell("الهاتف الشبكي", 2880),
                headerCell("الجوال", 2880),
                headerCell("البريد الإلكتروني الوزاري", 2880),
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.networkPhone, 2880),
                dataCell(form.phone, 2880),
                dataCell(form.email, 2880),
            ]
        })
    ]);

    // PAGE 1 - TABLE 3: Main Project Objective
    const objectiveTable = createTable([
        new TableRow({
            children: [
                headerCell("الهدف الرئيسي للمشروع / البرنامج", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.mainProjectObjective || "رفع كفاءة المعلمين في استخدام أدوات التعليم الرقمي", 8640)
            ]
        })
    ]);

    // PAGE 1 - TABLE 4: Implementation Period
    const implementationTable = createTable([
        new TableRow({
            children: [
                headerCell("فترة التنفيذ", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(`من ${form.startDate || '2025-01-02'} إلى ${form.endDate || '2025-05-05'}`, 8640)
            ]
        })
    ]);

    // PAGE 1 - TABLE 5: Detailed Description
    const descriptionTable = createTable([
        new TableRow({
            children: [
                headerCell("الوصف التفصيلي للمشروع / البرنامج والمراحل التنفيذية يتضمن الأنشطة", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.detailedProjectDescription || "يشمل المشروع تدريب المعلمين، تطوير محتوى تفاعلي، ومتابعة الأداء عبر منصة موحدة", 8640)
            ]
        })
    ]);

    // PAGE 1 - TABLE 6: Partnerships and Support
    const partnershipsTable = createTable([
        new TableRow({
            children: [
                headerCell("الفئة / الجهة المستهدفة", 2880),
                headerCell("الجهة الداعمة ) من خارج إدارة التعليم ( شراكات إن وجدت", 2880),
                headerCell("الإدارة المساندة ) من داخل إدارة التعليم (  إن وجدت", 2880)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.targetGroup, 2880),
                dataCell(form.supportingAgency, 2880),
                dataCell(form.supportingManagement, 2880)
            ]
        })
    ]);

    // PAGE 2 - TABLE 1: Team Members
    const teamMembersRows = [
        new TableRow({
            children: [
                new TableCell({
                    width: { size: 8640, type: WidthType.DXA },
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: "فريق العمل بالمشروع / البرنامج",
                                bold: true,
                                font: font,
                                size: 32
                            })],
                            alignment: AlignmentType.CENTER,
                            bidirectional: rtl
                        })
                    ],
                    columnSpan: 4,
                    margins: {
                        top: 100,
                        bottom: 100,
                        left: 100,
                        right: 100
                    }
                })
            ]
        }),
        new TableRow({
            children: [
                headerCell("جهة العمل", 2560),
                headerCell("الوظيفة", 2560),
                headerCell("الاسم", 2560),
                headerCell("م", 960)
            ]
        }),
        ...(form.teamMembers && form.teamMembers.length > 0
            ? form.teamMembers.map((member, index) =>
                new TableRow({
                    children: [
                        dataCell(member.workType || "", 2560),
                        dataCell(member.position || "", 2560),
                        dataCell(member.name || "", 2560),
                        dataCell((index + 1).toString(), 960)
                    ]
                })
            )
            : [
                new TableRow({
                    children: [
                        dataCell("الإدارة العامة", 2560),
                        dataCell("مدير المشروع", 2560),
                        dataCell("سارة العنزي", 2560),
                        dataCell("1", 960)
                    ]
                })
            ]
        )
    ];

    const teamTable = createTable(teamMembersRows);

    // PAGE 2 - TABLE 2: Performance Indicators
    const performanceTable = createTable([
        new TableRow({
            children: [
                new TableCell({
                    width: { size: 8640, type: WidthType.DXA },
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: "مؤشرات الأداء الخاصة بالمشروع / البرنامج",
                                bold: true,
                                font: font,
                                size: 32
                            })],
                            alignment: AlignmentType.CENTER,
                            bidirectional: rtl
                        })
                    ],
                    columnSpan: 3,
                    margins: {
                        top: 100,
                        bottom: 100,
                        left: 100,
                        right: 100
                    }
                })
            ]
        }),

        new TableRow({
            children: [
                headerCell("المؤشر الثالث:", 2880),
                headerCell("المؤشر الثاني:", 2880),
                headerCell("المؤشر الأول:", 2880)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.thirdIndicator || "", 2880),
                dataCell(form.secondIndicator || "", 2880),
                dataCell(form.firstIndicator || "", 2880)
            ]
        })
    ]);

    // PAGE 2 - TABLE 3: Challenges and Solutions
    const challengesTable = createTable([
        new TableRow({
            children: [
                headerCell("الصعوبات / التحديات المحتملة", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.potentialChallenges || "", 8640)
            ]
        }),
        new TableRow({
            children: [
                headerCell("الإجراءات المقترحة للتعامل معها", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.uniqueProcedures || "", 8640)
            ]
        }),
        new TableRow({
            children: [
                headerCell("الموازنة التقديرية للمشروع / البرنامج", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.projectBudget || "", 8640)
            ]
        })
    ]);

    // PAGE 2 - TABLE 4: Approval Section
    const approvalTable = createTable([
        new TableRow({
            children: [
                new TableCell({
                    width: { size: 8640, type: WidthType.DXA },
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: "اعتماد صاحب الصلاحية",
                                bold: true,
                                font: font,
                                size: 32
                            })],
                            alignment: AlignmentType.CENTER,
                            bidirectional: rtl
                        })
                    ],
                    columnSpan: 3,
                    margins: {
                        top: 100,
                        bottom: 100,
                        left: 100,
                        right: 100
                    }
                })
            ]
        }),

        new TableRow({
            children: [
                headerCell("التوقيع", 2880),
                headerCell("التاريخ", 2880),
                headerCell("الاسم", 2880)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.authoritySignature || " ", 2880),
                dataCell(form.authorityDate || "", 2880),
                dataCell(form.authorityName || "", 2880)
            ]
        })
    ]);

    const doc = new Document({
        sections: [{
            properties: {
                rtl: true,
                page: {
                    size: {
                        orientation: "portrait"
                    },
                    margin: {
                        top: 720,    // 0.5 inch
                        right: 720,  // 0.5 inch
                        bottom: 720, // 0.5 inch
                        left: 720    // 0.5 inch
                    }
                }
            },
            children: [
                // Document Title
                new Paragraph({
                    children: [new TextRun({
                        text: "نموذج اعتماد مشروع / برنامج",
                        bold: true,
                        font: font,
                        size: 38 // 16pt
                    })],
                    alignment: AlignmentType.CENTER,
                    bidirectional: rtl,
                    spacing: {
                        after: 400
                    }
                }),

                // PAGE 1 TABLES
                basicInfoTable,
                spacingParagraph(),

                contactTable,
                spacingParagraph(),

                objectiveTable,
                spacingParagraph(),

                implementationTable,
                spacingParagraph(),

                descriptionTable,
                spacingParagraph(),

                partnershipsTable,

                // PAGE BREAK
                new Paragraph({
                    children: [new PageBreak()]
                }),

                // PAGE 2 TABLES
                teamTable,
                spacingParagraph(),

                performanceTable,
                spacingParagraph(),

                challengesTable,
                spacingParagraph(),

                approvalTable
            ]
        }]
    });

    return doc;
};