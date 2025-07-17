import {
    Document, Paragraph, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, TextRun, PageBreak
} from 'docx';

export const createWordDoc = (form) => {
    const rtl = true;
    const font = "Arial";

    const headerCell = (text, width = 5000) => (
        new TableCell({
            width: { size: width, type: WidthType.DXA },
            shading: {
                fill: "0DA9A6", // ✅ HEX color without #
            },
            children: [new Paragraph({
                children: [new TextRun({
                    text,
                    bold: true,
                    font: font,
                    color: "FFFFFF", // White text
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
                new TableCell({
                    width: { size: 8640, type: WidthType.DXA },
                    shading: {
                        fill: "#15445A", // ✅ HEX color without #
                    },
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: "نموذج اعتماد مشروع / برنامج",
                                bold: true,
                                font: font,
                                size: 42
                            })],
                            alignment: AlignmentType.CENTER,
                            bidirectional: rtl
                        })
                    ],
                    columnSpan: 2,
                    margins: {
                        top: 140,
                        bottom: 140,
                        left: 100,
                        right: 100
                    }
                })
            ]
        }),
        new TableRow({
            children: [
                headerCell(form.ownerName?.label || "اسم مالك المشروع", 4320),
                headerCell(form.projectName?.label || "اسم المشروع", 4320)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.ownerName?.value || "", 4320),
                dataCell(form.projectName?.value || "", 4320)
            ]
        }),
        new TableRow({
            children: [
                headerCell(form.performanceIndicator?.label || "مؤشر الأداء المستهدف", 4320),
                headerCell(form.strategicObjective?.label || "الهدف الاستراتيجي", 4320)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.performanceIndicator?.value || "", 4320),
                dataCell(form.strategicObjective?.value || "", 4320)
            ]
        }),
        new TableRow({
            children: [
                headerCell(form.targetReading?.label || "القراءة المستهدفة للمؤشر", 4320),
                headerCell(form.previousReading?.label || "القراءة السابقة للمؤشر", 4320)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.targetReading?.value || "85%", 4320),
                dataCell(form.previousReading?.value || "50%", 4320)
            ]
        })
    ]);

    // PAGE 1 - TABLE 2: Contact Information
    const contactTable = createTable([
        new TableRow({
            children: [
                new TableCell({
                    width: { size: 8640, type: WidthType.DXA },
                    shading: {
                        fill: "#15445A", // ✅ HEX color without #
                    },
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: form.contactInfo?.label || "بيانات التواصل",
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
                headerCell(form.networkPhone?.label || "الهاتف الشبكي", 2880),
                headerCell(form.phone?.label || "الجوال", 2880),
                headerCell(form.email?.label || "البريد الإلكتروني الوزاري", 2880),
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.networkPhone?.value || "", 2880),
                dataCell(form.phone?.value || "", 2880),
                dataCell(form.email?.value || "", 2880),
            ]
        })
    ]);

    // PAGE 1 - TABLE 3: Main Project Objective
    const objectiveTable = createTable([
        new TableRow({
            children: [
                headerCell(form.mainProjectObjective?.label || "الهدف الرئيسي للمشروع / البرنامج", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.mainProjectObjective?.value || "رفع كفاءة المعلمين في استخدام أدوات التعليم الرقمي", 8640)
            ]
        }),
        new TableRow({
            children: [
                headerCell(form.implementationPeriod?.label || "فترة التنفيذ", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.implementationPeriod?.value || `من ${form.startDate?.value || '2025-01-02'} إلى ${form.endDate?.value || '2025-05-05'}`, 8640)
            ]
        }), new TableRow({
            children: [
                headerCell(form.detailedProjectDescription?.label || "الوصف التفصيلي للمشروع / البرنامج والمراحل التنفيذية يتضمن الأنشطة", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.detailedProjectDescription?.value || "يشمل المشروع تدريب المعلمين، تطوير محتوى تفاعلي، ومتابعة الأداء عبر منصة موحدة", 8640)
            ]
        })
    ]);

    const partnershipsTable = createTable([
        new TableRow({
            children: [
                headerCell(form.targetGroup?.label || "الفئة / الجهة المستهدفة", 2880),
                headerCell(form.supportingAgency?.label || "الجهة الداعمة ) من خارج إدارة التعليم ( شراكات إن وجدت", 2880),
                headerCell(form.supportingManagement?.label || "الإدارة المساندة ) من داخل إدارة التعليم (  إن وجدت", 2880)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.targetGroup?.value || "", 2880),
                dataCell(form.supportingAgency?.value || "", 2880),
                dataCell(form.supportingManagement?.value || "", 2880)
            ]
        })
    ]);

    // PAGE 2 - TABLE 1: Team Members
    const teamMembersRows = [
        new TableRow({
            children: [
                new TableCell({
                    width: { size: 8640, type: WidthType.DXA },
                    shading: {
                        fill: "#15445A", // ✅ HEX color without #
                    },
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: form.teamMembersSection?.label || "فريق العمل بالمشروع / البرنامج",
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
                headerCell(form.teamWorkType?.label || "جهة العمل", 2560),
                headerCell(form.teamPosition?.label || "الوظيفة", 2560),
                headerCell(form.teamName?.label || "الاسم", 2560),
                headerCell(form.teamIndex?.label || "م", 960)
            ]
        }),
        ...(form.teamMembers && form.teamMembers.length > 0
            ? form.teamMembers.map((member, index) =>
                new TableRow({
                    children: [
                        dataCell(member.workType?.value || "", 2560),
                        dataCell(member.position?.value || "", 2560),
                        dataCell(member.name?.value || "", 2560),
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
                    shading: {
                        fill: "#15445A", // ✅ HEX color without #
                    },
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: form.performanceIndicatorsSection?.label || "مؤشرات الأداء الخاصة بالمشروع / البرنامج",
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
                headerCell(form.thirdIndicator?.label || "المؤشر الثالث:", 2880),
                headerCell(form.secondIndicator?.label || "المؤشر الثاني:", 2880),
                headerCell(form.firstIndicator?.label || "المؤشر الأول:", 2880)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.thirdIndicator?.value || "", 2880),
                dataCell(form.secondIndicator?.value || "", 2880),
                dataCell(form.firstIndicator?.value || "", 2880)
            ]
        })
    ]);

    // PAGE 2 - TABLE 3: Challenges and Solutions
    const challengesTable = createTable([
        new TableRow({
            children: [
                headerCell(form.potentialChallenges?.label || "الصعوبات / التحديات المحتملة", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.potentialChallenges?.value || "", 8640)
            ]
        }),
        new TableRow({
            children: [
                headerCell(form.uniqueProcedures?.label || "الإجراءات المقترحة للتعامل معها", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.uniqueProcedures?.value || "", 8640)
            ]
        }),
        new TableRow({
            children: [
                headerCell(form.projectBudget?.label || "الموازنة التقديرية للمشروع / البرنامج", 8640)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.projectBudget?.value || "", 8640)
            ]
        })
    ]);

    // PAGE 2 - TABLE 4: Approval Section
    const approvalTable = createTable([
        new TableRow({
            children: [
                new TableCell({
                    width: { size: 8640, type: WidthType.DXA },
                    shading: {
                        fill: "#15445A", // ✅ HEX color without #
                    },
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: form.approvalSection?.label || "اعتماد صاحب الصلاحية",
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
                headerCell(form.authoritySignature?.label || "التوقيع", 2880),
                headerCell(form.authorityDate?.label || "التاريخ", 2880),
                headerCell(form.authorityName?.label || "الاسم", 2880)
            ]
        }),
        new TableRow({
            children: [
                dataCell(form.authoritySignature?.value || " ", 2880),
                dataCell(form.authorityDate?.value || "", 2880),
                dataCell(form.authorityName?.value || "", 2880)
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


                // PAGE 1 TABLES
                basicInfoTable,
                spacingParagraph(),

                contactTable,
                spacingParagraph(),

                objectiveTable,
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