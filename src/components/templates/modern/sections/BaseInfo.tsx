import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn, formatDateString, hardenVietnamese } from "@/lib/utils";
import { BasicInfo, getBorderRadiusValue, GlobalSettings } from "@/types/resume";
import { ResumeTemplate } from "@/types/template";
import SectionWrapper from "../../shared/SectionWrapper";
import { useTranslations, useLocale } from "@/i18n/compat/client";

interface BaseInfoProps {
    basic: BasicInfo | undefined;
    globalSettings: GlobalSettings | undefined;
    template?: ResumeTemplate;
}

/**
 * Modern template BaseInfo — designed for sidebar (white text on theme color background).
 */
const BaseInfo = ({ basic = {} as BasicInfo, globalSettings, template, variant = "default" }: BaseInfoProps & { variant?: "default" | "sidebar" }) => {
    const t = useTranslations("workbench");
    const locale = useLocale();
    const useIconMode = globalSettings?.useIconMode ?? false;
    const isSidebar = variant === "sidebar";

    const getIcon = (iconName: string | undefined) => {
        const IconComponent = Icons[iconName as keyof typeof Icons] as React.ElementType;
        return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
    };



    const getOrderedFields = React.useMemo(() => {
        if (!basic.fieldOrder) {
            return [{ key: "email", value: basic.email, icon: basic.icons?.email || "Mail", label: "电子邮箱", visible: true, custom: false }]
                .filter((item) => Boolean(item.value && item.visible));
        }
        return basic.fieldOrder
            .filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title")
            .map((field) => ({
                key: field.key, value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key] as string, locale) : (basic[field.key] as string),
                icon: basic.icons?.[field.key] || "User", label: field.label, visible: field.visible, custom: field.custom,
            }))
            .filter((item) => Boolean(item.value));
    }, [basic, locale]);

    const allFields = [
        ...getOrderedFields,
        ...(basic.customFields?.filter((field) => field.visible !== false).map((field) => ({
            key: field.id, value: field.value, icon: field.icon, label: field.label, visible: true, custom: true,
        })) || []),
    ];

    const nameField = basic.fieldOrder?.find((f) => f.key === "name") || { key: "name", visible: true };
    const titleField = basic.fieldOrder?.find((f) => f.key === "title") || { key: "title", visible: true };

    const PhotoComponent = basic.photo && basic.photoConfig?.visible && (
        <motion.div layout="position">
            <div style={{ width: `${basic.photoConfig?.width || 100}px`, height: `${basic.photoConfig?.height || 100}px`, borderRadius: getBorderRadiusValue(basic.photoConfig || { borderRadius: "none", customBorderRadius: 0 }), overflow: "hidden" }}>
                <img src={basic.photo} alt={`${basic.name}'s photo`} className="w-full h-full object-cover" />
            </div>
        </motion.div>
    );

    return (
        <SectionWrapper sectionId="basic" dark={isSidebar}>
            <div className={cn("flex flex-col gap-3", isSidebar ? "items-start" : "items-center")}>
                <div className={cn("flex flex-col gap-4", isSidebar ? "items-start w-full" : "items-center")}>
                    {PhotoComponent && (
                        <div className={cn("w-full flex", isSidebar ? "justify-start" : "justify-center")}>
                            {PhotoComponent}
                        </div>
                    )}
                    <div className={cn("flex flex-col min-w-0", isSidebar ? "text-left" : "text-center")} style={{ color: "#fff" }}>
                        {nameField.visible !== false && basic[nameField.key] && (
                            <motion.h1 layout="position" className="font-bold whitespace-pre-wrap text-balance text-pretty"
                                style={{
                                    fontSize: isSidebar ? "24px" : "30px",
                                    lineHeight: 1.2,
                                    color: "#fff"
                                }}>
                                {basic[nameField.key] as string}
                            </motion.h1>
                        )}
                        {titleField.visible !== false && basic[titleField.key] && (
                            <motion.h2 layout="position" className="whitespace-pre-wrap text-pretty mt-1"
                                style={{
                                    fontSize: isSidebar ? "16px" : "18px",
                                    color: "#fff",
                                    opacity: 0.9
                                }}>
                                {hardenVietnamese(basic[titleField.key] as string)}
                            </motion.h2>
                        )}
                    </div>
                </div>
                <motion.div layout="position" className="w-full flex flex-col gap-2"
                    style={{ fontSize: `${globalSettings?.baseFontSize || 14}px`, color: "#fff" }}>
                    {allFields.map((item) => (
                        <motion.div key={item.key} className="flex items-start text-baseFont group" style={{ width: "100%", color: "#fff" }}>
                            {useIconMode ? (
                                <div className="flex items-start gap-2" style={{ color: "#fff" }}>
                                    <div className="shrink-0 mt-1">{getIcon(item.icon)}</div>
                                    {item.key === "email" ?
                                        <a href={`mailto:${item.value}`} className="underline break-all" style={{ color: "#fff" }}>{item.value}</a>
                                        : <span className="break-words" style={{ color: "#fff" }}>{item.value}</span>}
                                </div>
                            ) : (
                                <div className="flex items-start gap-2" style={{ color: "#fff" }}>
                                    {!item.custom && <span className="shrink-0 opacity-80" style={{ color: "#fff" }}>{t(`basicPanel.basicFields.${item.key}`)}:</span>}
                                    {item.custom && <span className="shrink-0 opacity-80" style={{ color: "#fff" }}>{item.label}:</span>}
                                    <span className="break-all" suppressHydrationWarning style={{ color: "#fff" }}>{item.value}</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
};

export default BaseInfo;
